using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace BudgetApp.Models
{
    public class RecurrentExpense
    {
        [Key]
        public int Id { get; set; }
        [Precision(18, 2)]
        public decimal Amount { get; set; }
        // Period has 3 options, Monthly, Weekly, Daily
        public string Period { get; set; } = string.Empty;
        public DateTime? DayOfTheMonth { get; set; }
        public int? DayOfTheWeek { get; set; }
        [Required]
        [StringLength(40)]
        public string Name { get; set; } = string.Empty;
        public bool IsAutomatic { get; set; }

        [ForeignKey("ExpensesCategory")]
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
