using BudgetApp.Data;
using BudgetApp.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace BudgetApp.Controllers
{
    public class ExpenseController : Controller
    {
        private readonly BudgetDbContext _budgetDbContext;

        public ExpenseController(BudgetDbContext budgetDbContext)
        {
            _budgetDbContext = budgetDbContext;
        }

        [HttpGet]
        public async Task<IActionResult> Index()
        {
            FormsViewModel model = new FormsViewModel();
            model.ExpenseCategories = await _budgetDbContext.ExpenseCategories.ToListAsync();
            model.Accounts = await _budgetDbContext.Accounts.ToListAsync();
            model.CreditCards = await _budgetDbContext.CreditCards.ToListAsync();
            model.Debts = await _budgetDbContext.Debts.ToListAsync();
            model.Expenses = await _budgetDbContext.Expenses.Include(e => e.CreditCard).Include(e => e.Account).Include(e => e.ExpenseCategory).Include(e => e.Debt).OrderBy(e => e.Date).ToListAsync();
            // Recurrent Expneses
            model.Incomes = await _budgetDbContext.Incomes.Include(e => e.Account).Include(e => e.IncomeCategory).ToListAsync();
            return View(model);


        }

        [HttpGet]
        [ActionName("GetExpensesPartial")]
        public async Task<IActionResult> GetExpensesPartial()
        {
            FormsViewModel viewModel = new FormsViewModel();
            viewModel.Expenses = await _budgetDbContext.Expenses.Include(e => e.CreditCard).Include(e => e.Account).Include(e => e.ExpenseCategory).Include(e => e.Debt).OrderByDescending(e => e.Date).ToListAsync();
            viewModel.Accounts = await _budgetDbContext.Accounts.ToListAsync();
            viewModel.CreditCards = await _budgetDbContext.CreditCards.ToListAsync();
            viewModel.Debts = await _budgetDbContext.Debts.ToListAsync();
            viewModel.ExpenseCategories = await _budgetDbContext.ExpenseCategories.ToListAsync();
            return PartialView("_ExpensesPartial", viewModel);
        }

        [HttpPost]
        [ActionName("Add")]
        public async Task<IActionResult> Add(FormsViewModel expenseRequest)
        {
            if (expenseRequest.Expense.Description == null)
            {
                expenseRequest.Expense.Description = string.Empty;
            }

            //PENDING Do if options for every method of payment
            if (expenseRequest.Expense.Method == "Cash/Debit")
            {

            }
            else if (expenseRequest.Expense.Method == "Credit Card")
            {
                var dBcreditCard = await _budgetDbContext.CreditCards.FirstOrDefaultAsync(c => c.CreditCardId == expenseRequest.Expense.CreditCardId);

                if (dBcreditCard == null)
                {
                    return RedirectToAction(nameof(Index));
                }
      
            }
            // Debt
            else
            {

            }

            _budgetDbContext.Expenses.Add(expenseRequest.Expense);
            await _budgetDbContext.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        [HttpPost]
        [ActionName("EditExpense")]
        public async Task<IActionResult> EditExpense(Expense expense)
        {
            
            var dBExpense = await _budgetDbContext.Expenses.FirstOrDefaultAsync(c => c.Id == expense.Id);
            if (dBExpense == null)
            {
                return NotFound("not found");
            }
            dBExpense.Amount = expense.Amount;
            dBExpense.Date = expense.Date;
            dBExpense.ExpenseCategoryId = expense.ExpenseCategoryId;

            if (expense.Description.IsNullOrEmpty())
            {
                dBExpense.Description = string.Empty;
            }
            else
            {
                dBExpense.Description = expense.Description;
            }

            dBExpense.Method = expense.Method;

            var method = expense.Method;
            if (method == "Cash/Debit")
            {
                dBExpense.AccountId = expense.AccountId;
                dBExpense.CreditCardId = null;
                dBExpense.DebtId = null;
            }

            else if (method == "Credit Card")
            {
                dBExpense.CreditCardId = expense.CreditCardId;
                dBExpense.AccountId = null;
                dBExpense.DebtId = null;
            }

            else
            {
                dBExpense.DebtId = expense.DebtId;
                dBExpense.AccountId = null;
                dBExpense.CreditCardId = null;
            }

            _budgetDbContext.Expenses.Update(dBExpense);
            await _budgetDbContext.SaveChangesAsync();
            return Json(dBExpense);

        }

        [HttpDelete]
        [ActionName("DeleteExpense")]
        public async Task<IActionResult> DeleteExpense(Expense expense)
        {
            var dBExpense = await _budgetDbContext.Expenses.FirstOrDefaultAsync(c => c.Id == expense.Id);
            if (dBExpense == null)
            {
                return NotFound();
            }
            _budgetDbContext.Expenses.Remove(dBExpense);
            await _budgetDbContext.SaveChangesAsync();
            return View("Index");
        }
    }
}
