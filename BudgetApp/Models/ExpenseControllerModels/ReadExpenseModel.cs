using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using BudgetApp.Models.Common_Models;

namespace BudgetApp.Models.ExpenseControllerModels
{
    public class ReadExpenseModel
    {
        public int Id { get; set; }
        public decimal Amount { get; set; }
        public DateTime Date { get; set; }
        [StringLength(40)]
        public string Description { get; set; } = string.Empty;
        public int? ExpenseCategoryId { get; set; }
        public virtual ExpenseCategory? ExpenseCategory { get; set; }
        public int? AccountId { get; set; }
        public virtual Account? Account { get; set; }
        public int? CreditCardId { get; set; }
        public virtual CreditCard? CreditCard { get; set; }
        public int? DebtId { get; set; }
        public virtual Debt? Debt { get; set; }
    }

    public class ReadExpenseModelAction
    {
        public ReadExpenseModel ReadExpenseModel { get; set; }
        public TableParameters? TableParameters { get; set; }
    }
}
