using BudgetApp.Models;
using BudgetApp.Models.Database;
using Microsoft.EntityFrameworkCore;

namespace BudgetApp.Data
{
    public class BudgetDbContext : DbContext
    {
        public BudgetDbContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Account> Accounts { get; set; }
        public DbSet<RecurrentExpense> RecurrentExpenses { get; set; }
        public DbSet<Budget> Budgets { get; set; }
        public DbSet<CreditCard> CreditCards { get; set;}
        public DbSet<Debt> Debts { get; set; }
        public DbSet<Expense> Expenses { get; set; }
        public DbSet<ExpenseCategory> ExpenseCategories { get; set;}
        public DbSet<Income> Incomes { get; set; }
        public DbSet<IncomeCategory> IncomeCategories { get; set; }
    }
}
