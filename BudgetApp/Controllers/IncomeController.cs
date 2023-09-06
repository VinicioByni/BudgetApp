using BudgetApp.Data;
using BudgetApp.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Collections.Immutable;

namespace BudgetApp.Controllers
{
    
    public class IncomeController : Controller
    {
        private readonly BudgetDbContext _budgetDbContext;
        public IncomeController(BudgetDbContext budgetDbContext) 
        {
            _budgetDbContext = budgetDbContext;
        }

        public ViewModel generalViewModels()
        {
            ViewModel viewModel = new ViewModel();
            viewModel.IncomeCategories = _budgetDbContext.IncomeCategories.ToList();
            viewModel.Accounts = _budgetDbContext.Accounts.ToList();
            return viewModel;
        }

        public IQueryable<Income> FilterAndSortIncomes(string sortOrder, string searchString, string searchDateString, IQueryable<Income> incomes)
        {
            // Search Bar
            if (!String.IsNullOrEmpty(searchString))
            {
                incomes = incomes
                    .Where(i => i.Amount.ToString().Contains(searchString) ||
                    i.IncomeCategory.Name.Contains(searchString) ||
                    i.Account.Name.Contains(searchString) ||
                    i.Description.Contains(searchString));
            }

            if (!String.IsNullOrEmpty(searchDateString))
            {
                DateTime date = DateTime.Parse(searchDateString);
                incomes = incomes.Where(i => i.Date == date);
            }

            // Sort
            switch (sortOrder)
            {
                case "AmountAscending":
                    incomes = incomes
                        .OrderBy(i => i.Amount);
                    break;
                case "AmountDescending":
                    incomes = incomes.OrderByDescending(i => i.Amount);
                    break;
                case "DateAscending":
                    incomes = incomes.OrderBy(i => i.Date);
                    break;
                case "DateDescending":
                    incomes = incomes.OrderByDescending(i => i.Date);
                    break;
                case "CategoryAscending":
                    incomes = incomes.OrderBy(i => i.IncomeCategory.Name);
                    break;
                case "CategoryDescending":
                    incomes = incomes.OrderByDescending(i => i.IncomeCategory.Name);
                    break;


                case "AccountAscending":
                    incomes = incomes.OrderBy(i => i.Account.Name);
                    break;
                case "AccountDescending":
                    incomes = incomes.OrderByDescending(i => i.Account.Name);
                    break;



                case "DescriptionAscending":
                    incomes = incomes.OrderBy(i => i.Description);
                    break;
                case "DescriptionDescending":
                    incomes = incomes.OrderByDescending(i => i.Description);
                    break;


                default:
                    incomes = incomes.OrderByDescending(i => i.Date);
                    break;
            }

            return incomes;
        }
        public IQueryable<Income> RetrieveSelectedPeriodIncomes(string periodInitialDateString)
        {
            var incomes = from i in _budgetDbContext.Incomes select i;

            if (periodInitialDateString.IsNullOrEmpty())
            {
                periodInitialDateString = DateTime.Now.ToString("MM/01/yyyy");
            }
            DateTime periodInitialDate = DateTime.Parse(periodInitialDateString); 
            incomes = incomes
                    .Include(i => i.Account)
                    .Include(i => i.IncomeCategory)
                    .Where(i => i.Date >= periodInitialDate);

            return incomes;
        }
        public string ReturnInMinAttrDateInputFormat(string periodInitialDateString)
        {
            if (periodInitialDateString.IsNullOrEmpty())
            {
                periodInitialDateString = DateTime.Now.ToString("MM/01/yyyy");
            }
            DateTime periodInitialDate = DateTime.Parse(periodInitialDateString);

            return periodInitialDate.ToString("yyyy-MM-dd");
        }
        [HttpGet]
        public async Task<IActionResult> Index()
        {
            ViewModel model = new ViewModel();
            model = generalViewModels();
            model.Expenses = await _budgetDbContext.Expenses.Include(e => e.CreditCard).Include(e => e.Account).Include(e => e.ExpenseCategory).Include(e => e.Debt).OrderBy(e => e.Date).ToListAsync();
            // Recurrent Expneses
            model.Incomes = await _budgetDbContext.Incomes.Include(e => e.Account).Include(e => e.IncomeCategory).ToListAsync();
            return View(model);
        }

        [HttpGet]
        [ActionName("IncomesTotalAmount")]
        public async Task<IActionResult> IncomesTotalAmount(string periodInitialDateString)
        {
            if (periodInitialDateString.IsNullOrEmpty())
            {
                periodInitialDateString = DateTime.Now.ToString("MM/01/yyyy");
            }
            DateTime periodInitialDate = DateTime.Parse(periodInitialDateString);

            var incomes = await RetrieveSelectedPeriodIncomes(periodInitialDateString).ToListAsync();
            var incomesTotalAmount = incomes.Sum(i => i.Amount);

            return Json(incomesTotalAmount);
        }
        [HttpGet]
        [ActionName("_IncomesPartial")]
        public async Task<IActionResult> _IncomesPartial(string sortOrder, string searchString, string searchDateString, int pageSize,int pageNumber, string periodInitialDateString)
        {
            ViewModel viewModel = new ViewModel();

            viewModel = generalViewModels();

            var incomes = RetrieveSelectedPeriodIncomes(periodInitialDateString);

            var filteredIncomes = FilterAndSortIncomes(sortOrder, searchString, searchDateString, incomes);


            var pagesSkiped = pageNumber - 1;
            var incomesSkiped = (pageSize * pagesSkiped);

            viewModel.MinDateInput = ReturnInMinAttrDateInputFormat(periodInitialDateString);
            viewModel.TableName = "income";
            viewModel.FilteredIncomesCount = filteredIncomes.Count();
            viewModel.IncomesPeriodTotalAmount = incomes.Sum(i => i.Amount);      
            viewModel.Incomes = await filteredIncomes.Skip(incomesSkiped).Take(pageSize).ToListAsync();

            return PartialView("~/Views/Shared/Partial Views/_TablesPartial.cshtml", viewModel);
        }

        [HttpPost]
        [ActionName("AddIncome")]
        public async Task<IActionResult> AddIncome(Income income)
        {
            if (income.Description == null)
            {
                income.Description = string.Empty;
            }

            _budgetDbContext.Incomes.Add(income);
            await _budgetDbContext.SaveChangesAsync();


            return Ok();
        }

        [HttpPost]
        [ActionName("EditIncome")]
        public async Task<IActionResult> EditIncome(Income income)
        {

            var dBIncome = await _budgetDbContext.Incomes.FirstOrDefaultAsync(c => c.Id == income.Id);
            if (dBIncome == null)
            {
                return NotFound("not found");
            }

            dBIncome.Amount = income.Amount;
            dBIncome.Date = income.Date;
            dBIncome.IncomeCategoryId = income.IncomeCategoryId;

            if (income.Description.IsNullOrEmpty())
            {
                dBIncome.Description = string.Empty;
            }
            else
            {
                dBIncome.Description = income.Description;
            }

            dBIncome.AccountId = income.AccountId;

            _budgetDbContext.Incomes.Update(dBIncome);
            await _budgetDbContext.SaveChangesAsync();
            return Ok();

        }

        [HttpDelete]
        [ActionName("DeleteIncome")]
        public async Task<IActionResult> DeleteIncome(int id)
        {
            var dBIncome = await _budgetDbContext.Incomes.FirstOrDefaultAsync(c => c.Id == id);
            if (dBIncome == null)
            {
                return NotFound();
            }
            _budgetDbContext.Incomes.Remove(dBIncome);
            await _budgetDbContext.SaveChangesAsync();

            

            return Ok();
        }
    }
}
