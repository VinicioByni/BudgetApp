using System.ComponentModel.DataAnnotations;

namespace BudgetApp.Models
{
    public class ExpenseCategory
    {
        [Key]
        public int ExpenseCategoryId { get; set; }
        [Required]
        [StringLength(25)]
        public string Name { get; set; } = string.Empty;
        public virtual Expense? Expense { get; set; }
        public virtual RecurrentExpense? RecurrentExpense { get; set; }

    }
}
