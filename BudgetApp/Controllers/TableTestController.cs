using BudgetApp.Data;
using BudgetApp.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BudgetApp.Controllers
{
    public class TableTestController : Controller
    {
        private readonly BudgetDbContext _budgetDbContext;
        public TableTestController(BudgetDbContext budgetDbContext)
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

        public IQueryable<Income> incomeFilters(string sortOrder, string searchString)
        {
            var incomes = from e in _budgetDbContext.Incomes select e;

            incomes = incomes
                    .Include(e => e.Account)
                    .Include(e => e.IncomeCategory);


            // Search Bar
            if (!String.IsNullOrEmpty(searchString))
            {
                incomes = incomes
                    .Where(e => e.Amount.ToString().Contains(searchString) ||
                    e.IncomeCategory.Name.Contains(searchString) ||
                    e.Account.Name.Contains(searchString) ||
                    e.Description.Contains(searchString));
            }

            // Sort
            switch (sortOrder)
            {
                case "amount_ascending":
                    incomes = incomes
                        .OrderBy(e => e.Amount);
                    break;
                case "amount_descending":
                    incomes = incomes.OrderByDescending(e => e.Amount);
                    break;
                case "date_ascending":
                    incomes = incomes.OrderBy(e => e.Date);
                    break;
                case "date_descending":
                    incomes = incomes.OrderByDescending(e => e.Date);
                    break;
                case "category_ascending":
                    incomes = incomes.OrderBy(e => e.IncomeCategory.Name);
                    break;
                case "category_descending":
                    incomes = incomes.OrderByDescending(e => e.IncomeCategory.Name);
                    break;


                case "account_ascending":
                    incomes = incomes.OrderBy(e => e.Account.Name);
                    break;
                case "account_descending":
                    incomes = incomes.OrderByDescending(e => e.Account.Name);
                    break;



                case "description_ascending":
                    incomes = incomes.OrderBy(e => e.Description);
                    break;
                case "description_descending":
                    incomes = incomes.OrderByDescending(e => e.Description);
                    break;


                default:
                    incomes = incomes.OrderByDescending(e => e.Date);
                    break;
            }

            return incomes;
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
        [ActionName("GetIncomesJson")]
        public async Task<IActionResult> GetIncomesJson()
        {
            ViewModel viewModel = new ViewModel();

            viewModel.Incomes = await _budgetDbContext.Incomes
                .Include(e => e.Account)
                .Include(e => e.IncomeCategory)
                .OrderBy(e => e.Date)
                .ToListAsync();

            return Json(viewModel.Incomes);
        }

        [HttpGet]
        [ActionName("_IncomesPartial")]
        public async Task<IActionResult> _IncomesPartial(string sortOrder, string searchString, int pageSize, int pageNumber)
        {
            ViewModel viewModel = new ViewModel();

            var incomes = incomeFilters(sortOrder, searchString);

            viewModel = generalViewModels();
            viewModel.FilteredIncomesCount = incomes.Count();

            pageNumber -= 1;
            var incomesSkiped = (pageSize * pageNumber);
            viewModel.Incomes = await incomes.Skip(incomesSkiped).Take(pageSize).ToListAsync();

            viewModel.TableName = "income";
            return PartialView("_IncomesPartial", viewModel);
        }
    }
}
