﻿
using System.ComponentModel.DataAnnotations;
using BudgetApp.Models.Database;

namespace BudgetApp.Models
{
    public class ExpenseTableViewModel
    {
        public string MinSearchDateInputValue { get; set; } = string.Empty;
        public int[]? PagingButtonArray{ get; set; }
        public int? NumberOfEmptyRows { get; set; }
        public string PageInfoText { get; set; } = string.Empty;
        public string SortOption {  get; set; } = string.Empty;
        public string SortOrder { get; set; } = string.Empty;

        public Income? Income { get; set; }
        public List<Income>? Incomes { get; set; }
        public decimal? IncomesPeriodTotalAmount { get; set; }
        public int? FilteredIncomesCount { get; set; }
        public List<IncomeCategory>? IncomeCategories { get; set; }


        public Expense? Expense { get; set; }
        public List<Expense>? Expenses { get; set; }
        public decimal? ExpensesPeriodTotalAmount { get; set; }
        public int? FilteredExpensesCount { get; set; }
        public List<ExpenseCategory>? ExpenseCategories { get; set; }

        public RecurrentExpense? RecurrentExpense { get; set; }
        public List<RecurrentExpense>? RecurrentExpenses { get; set; }

        public Account? Account { get; set; }
        public List<Account>? Accounts { get; set; }
        public CreditCard? CreditCard { get; set;}
        public List<CreditCard>? CreditCards { get; set;}
        public Debt? Debt { get; set; }
        public List<Debt>? Debts { get; set; }

        public Budget? Budget { get; set; }
        public List<Budget>? Budgets { get; set; }
        

    }
}
