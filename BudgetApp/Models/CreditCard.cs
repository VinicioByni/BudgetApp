using System.ComponentModel.DataAnnotations;

namespace BudgetApp.Models
{
    public class CreditCard
    {
        [Key]
        public int CreditCardId { get; set; }
        [Required]
        [StringLength(25)]
        public string Name { get; set; } = string.Empty;
        public DateTime CutOffDate { get; set; }
        public DateTime DueDate { get; set; }
        public float AmountOwed { get; set; }
        public float CreditLimit { get; set; }
        public bool AutoPayment { get; set; }
        public virtual Expense? Expense { get; set; }
        public virtual RecurrentExpense? RecurrentExpense { get; set; }
    }
}
