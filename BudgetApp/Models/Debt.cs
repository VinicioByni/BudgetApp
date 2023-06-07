using System.ComponentModel.DataAnnotations;

namespace BudgetApp.Models
{
    public class Debt
    {
        [Key]
        public int DebtId { get; set; }
        // Type has two options (Lent, Borrowed), front end takes care of it
        public string Type { get; set; } = string.Empty;
        [Required]
        [StringLength(25)]
        public string Entity { get; set; } = string.Empty;
        [Required]
        [StringLength(40)]
        public string? Description { get; set; } = string.Empty;
        public float Amount { get; set; }
        public DateTime Date { get; set; }
        public DateTime DueDate { get; set; }
        public virtual Expense? Expense { get; set; }
        public virtual RecurrentExpense? RecurrentExpense { get; set; }

    }
}
