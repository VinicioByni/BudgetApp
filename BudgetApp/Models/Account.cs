using System.ComponentModel.DataAnnotations;

namespace BudgetApp.Models
{
    public class Account
    {
        [Key]
        public int AccountId { get; set; }
        [Required]
        [StringLength(25)]
        public string Name { get; set; } = string.Empty;
        public float Amount { get; set; }
        public virtual Expense? Expense { get; set; }
        public virtual Income? Income { get; set; }
        public virtual RecurrentExpense? RecurrentExpense { get; set; }
    }
}
