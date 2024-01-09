
using BudgetApp.Data;
using BudgetApp.Models;
using BudgetApp.Models.Expense_Models;
using BudgetApp.Models.Common_Models;
using BudgetApp.Models.ExpenseControllerModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Linq;
using BudgetApp.DTOs;

namespace BudgetApp.Controllers
{
    

    public class ExpenseController : Controller
    {
        private readonly BudgetDbContext _budgetDbContext;

        public ExpenseController(BudgetDbContext budgetDbContext)
        {
            _budgetDbContext = budgetDbContext;
        }

        public ViewModel generalViewModels()
        {
            ViewModel viewModel = new ViewModel();
            viewModel.ExpenseCategories = _budgetDbContext.ExpenseCategories.ToList();
            viewModel.Accounts = _budgetDbContext.Accounts.ToList();
            viewModel.CreditCards = _budgetDbContext.CreditCards.ToList();
            viewModel.Debts = _budgetDbContext.Debts.ToList();

            return viewModel;
        }

        public IQueryable<Expense> FilterAndSortExpenses(TableParameters tableParameters, IQueryable<Expense> expenses)
        {
            var searchExpenseString = tableParameters.searchString;
            var searchDate = tableParameters.searchDate; 
            var sortExpenseOrder = tableParameters.sort;
            // Search Bar
            if (!String.IsNullOrEmpty(searchExpenseString))
            {
                expenses = expenses
                    .Where(e => e.Amount.ToString().Contains(searchExpenseString) ||
                    e.ExpenseCategory.Name.Contains(searchExpenseString) ||
                    e.Account.Name.Contains(searchExpenseString) ||
                    e.CreditCard.Name.Contains(searchExpenseString) ||
                    e.Debt.Entity.Contains(searchExpenseString) ||
                    e.Description.Contains(searchExpenseString));
            }

            if (!String.IsNullOrEmpty(searchDate))
            {
                DateTime date = DateTime.Parse(searchDate);
                expenses = expenses.Where(e => e.Date == date);
            }

            // Sort
            switch (sortExpenseOrder)
            {
                case "AmountAscending":
                    expenses = expenses
                        .OrderBy(e => e.Amount);
                    break;
                case "AmountDescending":
                    expenses = expenses.OrderByDescending(e => e.Amount);
                    break;
                case "DateAscending":
                    expenses = expenses.OrderBy(e => e.Date);
                    break;
                case "DateDescending":
                    expenses = expenses.OrderByDescending(e => e.Date);
                    break;
                case "CategoryAscending":
                    expenses = expenses.OrderBy(e => e.ExpenseCategory.Name);
                    break;
                case "CategoryDescending":
                    expenses = expenses.OrderByDescending(e => e.ExpenseCategory.Name);
                    break;
                case "PaymentAscending":
                    expenses = expenses.OrderBy(e => e.Account.Name);
                    break;
                case "PaymentDescending":
                    expenses = expenses.OrderByDescending(e => e.Account.Name);
                    break;
                case "DescriptionAscending":
                    expenses = expenses.OrderBy(e => e.Description);
                    break;
                case "DescriptionDescending":
                    expenses = expenses.OrderByDescending(e => e.Description);
                    break;
                default:
                    expenses = expenses.OrderByDescending(e => e.Date);
                    break;
            }

            return expenses;
        }

        public IQueryable<Expense> RetrieveSelectedPeriodExpenses(string periodInitialDateString)
        {
            var expenses = from expense in _budgetDbContext.Expenses select expense;

            if (periodInitialDateString.IsNullOrEmpty())
            {
                periodInitialDateString = DateTime.Now.ToString("MM/01/yyyy");
            }
            DateTime periodInitialDate = DateTime.Parse(periodInitialDateString);

            expenses = expenses
                    .Include(e => e.CreditCard)
                    .Include(e => e.Account)
                    .Include(e => e.ExpenseCategory)
                    .Include(e => e.Debt)
                    .Where(e => e.Date >= periodInitialDate);

            return expenses;
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
        [ActionName("ExpensesTotalAmount")]
        public async Task<IActionResult> ExpensesTotalAmount(string periodInitialDateString)
        {

            if (periodInitialDateString.IsNullOrEmpty())
            {
                periodInitialDateString = DateTime.Now.ToString("MM/01/yyyy");
            }
            DateTime periodInitialDate = DateTime.Parse(periodInitialDateString);

            var expenses = await RetrieveSelectedPeriodExpenses(periodInitialDateString).ToListAsync();
            var expensesTotalAmount = expenses.Sum(e => e.Amount);
            return Json(expensesTotalAmount);
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

        public async Task<ViewModel> ExpenseTablePartialViewModel(TableParameters? tableParameters)
        {
            if (tableParameters == null)
            {
                tableParameters  = new TableParameters();
                
            }
            tableParameters.setDefaultParameters();
            /* 
                Pending!
                    --Add logic for the empty or wrong parameters for protection
                    --If necessary make it into a function
                        --Take into account the pageSize, always reset it
                        --Page number cannot be less than 1, or bigger than the number 
                        possible pages
                        --period initial date always check its the first of some month
             */

            ViewModel viewModel = new ViewModel();

            viewModel = generalViewModels();

            var expenses = RetrieveSelectedPeriodExpenses(tableParameters.periodInitialDate);

            var filteredExpenses = FilterAndSortExpenses(tableParameters, expenses);

            var pagesSkiped = tableParameters.pageNumber - 1;
            var expensesSkiped = (tableParameters.pageSize * pagesSkiped);

            viewModel.MinDateInput = ReturnInMinAttrDateInputFormat(tableParameters.periodInitialDate);
            viewModel.TableName = "expense";
            viewModel.FilteredExpensesCount = filteredExpenses.Count();
            viewModel.ExpensesPeriodTotalAmount = expenses.Sum(e => e.Amount);
            viewModel.Expenses = await filteredExpenses.Skip(expensesSkiped).Take(tableParameters.pageSize).ToListAsync();

            return viewModel;
        }


        [HttpGet]
        [ActionName("_ExpenseTablePartial")]
        public async Task<IActionResult> Get([FromQuery]TableParameters tableParameters)
        {
            if (tableParameters == null)
            {
                tableParameters = new TableParameters();
                tableParameters.setDefaultParameters();
            }

            ViewModel viewModel = new ViewModel();
            viewModel = await ExpenseTablePartialViewModel(tableParameters);
            
            return PartialView("~/Views/Shared/Partial Views/_ExpenseTablePartial.cshtml", viewModel);
        }
        [HttpGet]
        [ActionName("ExpenseGetById")]
        public async Task<ActionResult<ExpenseDto>> GetById(int id)
        {
            var expense = await _budgetDbContext.Expenses.FindAsync(id);

            if (expense == null)
            {
                return NotFound();
            }

            var expenseDto = new ExpenseDto {
                Amount = expense.Amount,
                Date = expense.Date,
                Description = expense.Description,
                ExpenseCategoryId = expense.ExpenseCategoryId,
                AccountId = expense.AccountId,
                CreditCardId = expense.CreditCardId,
                DebtId = expense.DebtId
            };
            return Ok(expenseDto);
        }

        [HttpPost]
        [ActionName("AddExpense")]
        public async Task<ActionResult<ExpenseDto>> Add([FromBody]ExpenseAddDto expenseAddDto)
        {
            if (expenseAddDto == null)
            {
                return BadRequest("No expense data sent");
            }

            if (expenseAddDto.Description == null)
            {
                expenseAddDto.Description = string.Empty;
            }

            int descriptionMaxLength = 40;
            if (expenseAddDto.Description.Length > descriptionMaxLength)
            {
                expenseAddDto.Description = expenseAddDto.Description.Substring(0, descriptionMaxLength);
            }

            var expense = new Expense
            {
                Amount = expenseAddDto.Amount,
                Date = expenseAddDto.Date,
                Description = expenseAddDto.Description,
                ExpenseCategoryId = expenseAddDto.ExpenseCategoryId,
                AccountId = expenseAddDto.AccountId,
                CreditCardId = expenseAddDto.CreditCardId,
                DebtId = expenseAddDto.DebtId
            };

            await _budgetDbContext.Expenses.AddAsync(expense);
            await _budgetDbContext.SaveChangesAsync();

            var expenseDto = new ExpenseDto
            {
                Id = expense.Id,
                Amount = expense.Amount,
                Date = expense.Date,
                Description = expense.Description,
                ExpenseCategoryId= expense.ExpenseCategoryId,
                AccountId = expense.AccountId,
                CreditCardId= expense.CreditCardId,
                DebtId = expense.DebtId
            };

            return Ok(expenseDto);
        }

        [HttpPut]
        [ActionName("UpdateExpense")]
        public async Task<ActionResult<ExpenseDto>> Update([FromBody]ExpenseUpdateDto expenseUpdateDto)
        {
            if (expenseUpdateDto == null)
            {
                return BadRequest("No expense data send for update");
            }

            var expense = await _budgetDbContext.Expenses.FindAsync(expenseUpdateDto.Id);

            if (expense == null)
            {
                return NotFound("not found");
            }

            int descriptionMaxLength = 40;
            if (expenseUpdateDto.Description.Length > descriptionMaxLength)
            {
                expenseUpdateDto.Description = expenseUpdateDto.Description.Substring(0, descriptionMaxLength);
            }

            expense.Amount = expenseUpdateDto.Amount;
            expense.Date = expenseUpdateDto.Date;
            expense.Description = expenseUpdateDto.Description;
            expense.ExpenseCategoryId = expenseUpdateDto.ExpenseCategoryId;
            expense.AccountId = expenseUpdateDto.AccountId;
            expense.CreditCardId = expenseUpdateDto.CreditCardId;
            expense.DebtId = expenseUpdateDto.DebtId;
            
            _budgetDbContext.Expenses.Update(expense);
            await _budgetDbContext.SaveChangesAsync();

            var expenseDto = new ExpenseDto
            {
                Id = expense.Id,
                Amount = expense.Amount,
                Date = expense.Date,
                Description = expense.Description,
                ExpenseCategoryId = expense.ExpenseCategoryId,
                AccountId = expense.AccountId,
                CreditCardId = expense.CreditCardId,
                DebtId = expense.DebtId
            };

            return Ok(expenseDto);

        }    


        [HttpDelete]
        [ActionName("DeleteExpense")]
        public async Task<ActionResult<ExpenseDto>> Delete(int id)
        {
            var expense = await _budgetDbContext.Expenses.FindAsync(id);

            if (expense == null)
            {
                return NotFound();
            }

            _budgetDbContext.Expenses.Remove(expense);
            await _budgetDbContext.SaveChangesAsync();

            var expenseDto = new ExpenseDto
            {
                Id = expense.Id,
                Amount = expense.Amount,
                Date = expense.Date,
                Description = expense.Description,
                ExpenseCategoryId = expense.ExpenseCategoryId,
                AccountId = expense.AccountId,
                CreditCardId = expense.CreditCardId,
                DebtId = expense.DebtId
            };

            return Ok(expenseDto);
        }
    }
}
