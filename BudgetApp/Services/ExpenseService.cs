using BudgetApp.Data;
using BudgetApp.DTOs;
using BudgetApp.Models;
using BudgetApp.Models.Common_Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace BudgetApp.Services
{
    public class ExpenseService : IExpenseService
    {
        private readonly BudgetDbContext _budgetDbContext;
        public ExpenseService(BudgetDbContext budgetDbContext)
        {
            _budgetDbContext = budgetDbContext;
        }
 
        public async Task<ViewModel> Get(TableParameters tableParameters)
        {
            var viewModel = await GetViewModel(tableParameters);

            return viewModel;
        }

        public async Task<ExpenseDto> GetById(int id)
        {
            var expense = await _budgetDbContext.Expenses.FindAsync(id);

            if (expense != null)
            {
                var expenseDto = new ExpenseDto
                {
                    Amount = expense.Amount,
                    Date = expense.Date,
                    Description = expense.Description,
                    ExpenseCategoryId = expense.ExpenseCategoryId,
                    AccountId = expense.AccountId,
                    CreditCardId = expense.CreditCardId,
                    DebtId = expense.DebtId
                };
                return expenseDto;
            }

            return null;
        }

        public async Task<ExpenseDto> Add(ExpenseAddDto expenseAddDto)
        {
            
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

            var expenseDto = GetExpenseDto(expense);

            return expenseDto;
           
        }

        public async Task<ExpenseDto> Update(ExpenseUpdateDto expenseUpdateDto)
        {
            var expense = await _budgetDbContext.Expenses.FindAsync(expenseUpdateDto.Id);

            if (expense != null)
            {

                expense.Amount = expenseUpdateDto.Amount;
                expense.Date = expenseUpdateDto.Date;
                expense.Description = expenseUpdateDto.Description;
                expense.ExpenseCategoryId = expenseUpdateDto.ExpenseCategoryId;
                expense.AccountId = expenseUpdateDto.AccountId;
                expense.CreditCardId = expenseUpdateDto.CreditCardId;
                expense.DebtId = expenseUpdateDto.DebtId;

                _budgetDbContext.Expenses.Update(expense);
                await _budgetDbContext.SaveChangesAsync();

                var expenseDto = GetExpenseDto(expense);

                return expenseDto;
            }

            return null;
        }

        public async Task<ExpenseDto> DeleteById(int id)
        {
            var expense = await _budgetDbContext.Expenses.FindAsync(id);

            if (expense != null) 
            {
                _budgetDbContext.Expenses.Remove(expense);
                await _budgetDbContext.SaveChangesAsync();

                var expenseDto = GetExpenseDto(expense);

                return expenseDto;
            }

            return null;
        }

        private ExpenseDto GetExpenseDto(Expense expense)
        {
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

            return expenseDto;
        }

        private async Task<ViewModel> GetViewModel(TableParameters tableParameters)
        {
            ViewModel viewModel = new ViewModel();
            viewModel.ExpenseCategories = _budgetDbContext.ExpenseCategories.ToList();
            viewModel.Accounts = _budgetDbContext.Accounts.ToList();
            viewModel.CreditCards = _budgetDbContext.CreditCards.ToList();
            viewModel.Debts = _budgetDbContext.Debts.ToList();

            var expenses = from expense in _budgetDbContext.Expenses select expense;

            var startDateString = tableParameters.periodInitialDate;
            if (String.IsNullOrEmpty(startDateString))
            {
                startDateString = DateTime.Now.ToString("MM/01/yyyy");
            }
            DateTime startDate = DateTime.Parse(startDateString);
            viewModel.MinSearchDateInputValue = startDate.ToString("yyyy-MM-dd");

            expenses = expenses
                    .Include(e => e.CreditCard)
                    .Include(e => e.Account)
                    .Include(e => e.ExpenseCategory)
                    .Include(e => e.Debt)
                    .Where(e => e.Date >= startDate);

            var filteredExpenses = GetFilteredExpenses(expenses, tableParameters);

            var pagesSkiped = tableParameters.pageNumber - 1;
            if (pagesSkiped < 0) { pagesSkiped = 0; }
            var expensesSkiped = (tableParameters.pageSize * pagesSkiped);

            var pageSize = tableParameters.pageSize;
            if (pageSize <= 0) { pageSize = 5; }

            viewModel.FilteredExpensesCount = filteredExpenses.Count();
            viewModel.ExpensesPeriodTotalAmount = expenses.Sum(e => e.Amount);
            viewModel.Expenses = await filteredExpenses.Skip(expensesSkiped).Take(pageSize).ToListAsync();
            return viewModel;
        }

        private IQueryable<Expense> GetFilteredExpenses(IQueryable<Expense> expenses, TableParameters tableParameters)
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
       
    }
}
