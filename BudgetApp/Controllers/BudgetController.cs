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
            ViewModel model = new ViewModel();
            model.ExpenseCategories = await _budgetDbContext.ExpenseCategories.ToListAsync();
            model.Accounts = await _budgetDbContext.Accounts.ToListAsync();
            model.CreditCards = await _budgetDbContext.CreditCards.ToListAsync();
            model.Debts = await _budgetDbContext.Debts.ToListAsync();
            model.Expenses = await _budgetDbContext.Expenses.ToListAsync();
            // Pending Recurrent Expneses
            model.Incomes = await _budgetDbContext.Incomes.Include(e => e.Account).Include(e => e.IncomeCategory).ToListAsync();
            return View(model);
        }

        [HttpGet]
        [ActionName("_BudgetPartial")]
        public async Task<IActionResult> _BudgetPartial(Budget newBudget)
        {
            ViewModel viewModel = new ViewModel();

            viewModel.Budgets = await _budgetDbContext.Budgets.ToListAsync();
            foreach (Budget budget in viewModel.Budgets)
            {
                viewModel.Budget = budget;
                break;
            }
            return PartialView("~/Views/Shared/Partial Views/_BudgetPartial.cshtml", viewModel);

        }

        [HttpGet]
        [ActionName("GetBudget")]
        public async Task<IActionResult> GetBudget()
        {

            var dBBudget = await _budgetDbContext.Budgets.SingleOrDefaultAsync();

            if (dBBudget == null)
            {
                return NotFound();
            }

            return Json(dBBudget);

        }

        [HttpPost]
        [ActionName("UpdateBudget")]
        public async Task<IActionResult> UpdateBudget(decimal amount)
        {

            var dBBudget = await _budgetDbContext.Budgets.SingleOrDefaultAsync();
            if (dBBudget == null)
            {
                return NotFound();
            }

            dBBudget.Amount = amount;
            _budgetDbContext.Budgets.Update(dBBudget);
            await _budgetDbContext.SaveChangesAsync();

            
            return Json(dBBudget);
        }
    }
}
