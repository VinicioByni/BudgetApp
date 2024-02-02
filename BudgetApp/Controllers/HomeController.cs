using BudgetApp.Data;
using BudgetApp.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics;

namespace BudgetApp.Controllers
{
    public class HomeController : Controller
    {       
        private readonly ILogger<HomeController> _logger;
        private readonly BudgetDbContext _budgetDbContext;

        public HomeController(ILogger<HomeController> logger, BudgetDbContext budgetDbContext)
        {
            _logger = logger;
            _budgetDbContext = budgetDbContext;
        }

        public async Task<IActionResult> Index()
        {
            ExpenseTableViewModel viewModel = new ExpenseTableViewModel();
            viewModel.Expenses = await _budgetDbContext.Expenses.ToListAsync();
            viewModel.ExpenseCategories = await _budgetDbContext.ExpenseCategories.ToListAsync();

            viewModel.RecurrentExpenses = await _budgetDbContext.RecurrentExpenses.ToListAsync();

            viewModel.Accounts = await _budgetDbContext.Accounts.ToListAsync();
            viewModel.CreditCards = await _budgetDbContext.CreditCards.ToListAsync();
            viewModel.Debts = await _budgetDbContext.Debts.ToListAsync();
            
            
            viewModel.Incomes = await _budgetDbContext.Incomes.Include(e => e.Account).Include(e => e.IncomeCategory).ToListAsync();
            viewModel.IncomeCategories = await _budgetDbContext.IncomeCategories.ToListAsync();

            viewModel.Budgets = await _budgetDbContext.Budgets.ToListAsync();
            foreach (Budget budget in viewModel.Budgets)
            {
                viewModel.Budget = budget;
                break;
            }
            
            return View(viewModel);
        }

        public async Task<IActionResult> AccountsAndDebts()
        {
            ExpenseTableViewModel viewModel = new ExpenseTableViewModel();
            viewModel.Expenses = await _budgetDbContext.Expenses.ToListAsync();
            viewModel.ExpenseCategories = await _budgetDbContext.ExpenseCategories.ToListAsync();

            viewModel.RecurrentExpenses = await _budgetDbContext.RecurrentExpenses.ToListAsync();

            viewModel.Accounts = await _budgetDbContext.Accounts.ToListAsync();
            viewModel.CreditCards = await _budgetDbContext.CreditCards.ToListAsync();
            viewModel.Debts = await _budgetDbContext.Debts.ToListAsync();


            viewModel.Incomes = await _budgetDbContext.Incomes.Include(e => e.Account).Include(e => e.IncomeCategory).ToListAsync();
            viewModel.IncomeCategories = await _budgetDbContext.IncomeCategories.ToListAsync();

            viewModel.Budgets = await _budgetDbContext.Budgets.ToListAsync();
            foreach (Budget budget in viewModel.Budgets)
            {
                viewModel.Budget = budget;
                break;
            }

            return View(viewModel);
        }


        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}