using BudgetApp.Data;
using BudgetApp.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BudgetApp.Controllers
{
    public class BudgetController : Controller
    {
        private readonly BudgetDbContext _budgetDbContext;
        public BudgetController(BudgetDbContext budgetDbContext)
        {
            _budgetDbContext = budgetDbContext;
        }

        public async Task<IActionResult> Index()
        {
            FormsViewModel model = new FormsViewModel();
            model.ExpenseCategories = await _budgetDbContext.ExpenseCategories.ToListAsync();
            model.Accounts = await _budgetDbContext.Accounts.ToListAsync();
            model.CreditCards = await _budgetDbContext.CreditCards.ToListAsync();
            model.Debts = await _budgetDbContext.Debts.ToListAsync();
            model.Expenses = await _budgetDbContext.Expenses.ToListAsync();
            // Pending Recurrent Expneses
            model.Incomes = await _budgetDbContext.Incomes.Include(e => e.Account).Include(e => e.IncomeCategory).ToListAsync();
            return View(model);
        }

        [HttpPost]
        [ActionName("Add")]
        public async Task<IActionResult> Add(Budget budget)
        {
            var dBBudget = await _budgetDbContext.Budgets.FirstOrDefaultAsync(b => b.Id == budget.Id);
            if (dBBudget == null)
            {
                return NotFound();
            }

            dBBudget.Amount = budget.Amount;
            _budgetDbContext.Budgets.Update(dBBudget);
            await _budgetDbContext.SaveChangesAsync();
            return Json(budget);
        }
    }
}
