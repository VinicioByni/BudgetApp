﻿using BudgetApp.Classes;
using BudgetApp.Data;
using BudgetApp.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Linq;

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

        public IQueryable<Expense> FilterAndSortExpenses(string sortExpenseOrder, string searchExpenseString, string searchDateString, IQueryable<Expense> expenses)
        {
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

            // Search Date Bar
            if (!String.IsNullOrEmpty(searchDateString))
            {
                DateTime date = DateTime.Parse(searchDateString);
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



        [HttpGet]
        [ActionName("_ExpensesPartial")]
        public async Task<IActionResult> _ExpensesPartial(string sortOrder, string searchString,
            string searchDateString, int pageSize, int pageNumber,string periodInitialDateString)
        {
            
            ViewModel viewModel = new ViewModel();

            viewModel = generalViewModels();

            var expenses = RetrieveSelectedPeriodExpenses(periodInitialDateString);

            var filteredExpenses = FilterAndSortExpenses(sortOrder, searchString, searchDateString, expenses);
            
            var pagesSkiped = pageNumber - 1; 
            var expensesSkiped = (pageSize * pagesSkiped);

            viewModel.MinDateInput = ReturnInMinAttrDateInputFormat(periodInitialDateString);
            viewModel.TableName = "expense";
            viewModel.FilteredExpensesCount = filteredExpenses.Count();
            viewModel.ExpensesPeriodTotalAmount = expenses.Sum(e => e.Amount);
            viewModel.Expenses = await filteredExpenses.Skip(expensesSkiped).Take(pageSize).ToListAsync();
            
            return PartialView("~/Views/Shared/Partial Views/_TablesPartial.cshtml", viewModel);
        }


        [HttpPost]
        [ActionName("AddExpense")]
        public async Task<IActionResult> AddExpense(Expense expense)
        {
            if (expense.Description == null)
            {
                expense.Description = string.Empty;
            }

            _budgetDbContext.Expenses.Add(expense);
            await _budgetDbContext.SaveChangesAsync();

            return Ok();
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


            if (expense.AccountId != null)
            {
                dBExpense.AccountId = expense.AccountId;
                dBExpense.CreditCardId = null;
                dBExpense.DebtId = null;
            }
            else if (expense.CreditCardId != null)
            {
                dBExpense.AccountId = null;
                dBExpense.CreditCardId = expense.CreditCardId;
                dBExpense.DebtId = null;
            }
            else if (expense.DebtId != null)
            {
                dBExpense.AccountId = null;
                dBExpense.CreditCardId = null;
                dBExpense.DebtId = expense.DebtId;
            }
            
            
            _budgetDbContext.Expenses.Update(dBExpense);
            await _budgetDbContext.SaveChangesAsync();

            return Ok();

        }    


        [HttpDelete]
        [ActionName("DeleteExpense")]
        public async Task<IActionResult> DeleteExpense(int id)
        {
            var dBExpense = await _budgetDbContext.Expenses.FirstOrDefaultAsync(c => c.Id == id);
            if (dBExpense == null)
            {
                return NotFound();
            }
            _budgetDbContext.Expenses.Remove(dBExpense);
            await _budgetDbContext.SaveChangesAsync();

            return Ok();
        }
    }
}