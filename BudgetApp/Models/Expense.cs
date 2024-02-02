using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BudgetApp.Models
{
    public class Expense
    {
        [Key]
        public int Id { get; set; }
        [Precision(18, 2)]
        public decimal Amount { get; set; }
        [DisplayFormat(DataFormatString = "{0:ddd d MMM yyyy}")]
        public DateTime Date { get; set; }
        [StringLength(40)]
        public string Description { get; set; } = string.Empty;
        [ForeignKey("ExpenseCategory")]
        public int? ExpenseCategoryId { get; set; }
        public virtual ExpenseCategory? ExpenseCategory { get; set; }
        [ForeignKey("Account")]
        public int? AccountId { get; set; }
        public virtual Account? Account { get; set; }
        [ForeignKey("CreditCard")]
        public int? CreditCardId { get; set; }
        public virtual CreditCard? CreditCard { get; set; }
        [ForeignKey("Debt")]
        public int? DebtId { get; set; }
        public virtual Debt? Debt { get; set; }
    }
}
