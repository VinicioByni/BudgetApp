﻿using BudgetApp.Data;
using BudgetApp.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BudgetApp.Controllers
{
    
    public class IncomeController : Controller
    {
        private readonly BudgetDbContext _budgetDbContext;
        public IncomeController(BudgetDbContext budgetDbContext) 
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
            model.Expenses = await _budgetDbContext.Expenses.Include(e => e.CreditCard).Include(e => e.Account).Include(e => e.ExpenseCategory).Include(e => e.Debt).ToListAsync();
            // Recurrent Expneses
            model.Incomes = await _budgetDbContext.Incomes.Include(e => e.Account).Include(e => e.IncomeCategory).ToListAsync();
            return View(model);
        }

        [HttpPost]
        [ActionName("Add")]
        public async Task<IActionResult> Add(FormsViewModel incomeRequest)
        {    
            if(incomeRequest.Income.Description == null) 
            { 
                incomeRequest.Income.Description = string.Empty;
            }

            _budgetDbContext.Incomes.Add(incomeRequest.Income);
            await _budgetDbContext.SaveChangesAsync();
            return View();
        }

        

    }
}
