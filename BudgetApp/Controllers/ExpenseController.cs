using BudgetApp.Data;
using BudgetApp.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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
        public IActionResult Index()
        {
            return View();
        }

        
        [HttpPost]
        [ActionName("Add")]
        public async Task<IActionResult> Add(FormsViewModel expenseRequest)
        {
            if (expenseRequest.Expense.Description == null)
            {
                expenseRequest.Expense.Description = string.Empty;
            }

            
            _budgetDbContext.Expenses.Add(expenseRequest.Expense);
            await _budgetDbContext.SaveChangesAsync();
            await Console.Out.WriteLineAsync("entered id = 0");
            return RedirectToAction(nameof(Index));
        }

        [HttpGet]
        [ActionName("ExpenseDetails")]
        public async Task<IActionResult> ExpenseDetails(int? id)
        {
            var expense = _budgetDbContext.Expenses.FirstOrDefault(e => e.Id == id);
            return Json(new {data = expense});
        }

        [HttpGet]
        public async Task<IActionResult> GetExpenses()
        {
            var expenses = await _budgetDbContext.Expenses.Include(e => e.CreditCard).Include(e => e.Account).Include(e => e.ExpenseCategory).Include(e => e.Debt).ToListAsync();
            return Json(new { data = expenses });
        }
    }
}
