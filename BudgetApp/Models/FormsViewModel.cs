namespace BudgetApp.Models
{
    public class FormsViewModel
    {
        public Income? Income { get; set; }
        public List<Income>? Incomes { get; set; }
        public List<IncomeCategory>? IncomeCategories { get; set; }

        public Expense? Expense { get; set; }
        public List<Expense>? Expenses { get; set; }
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
