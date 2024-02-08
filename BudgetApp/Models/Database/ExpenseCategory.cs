using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using BudgetApp.Models.Database;

namespace BudgetApp.Models
{
    public class ExpenseCategory
    {
        [Key]
        public int ExpenseCategoryId { get; set; }
        [Required]
        [StringLength(25)]
        public string Name { get; set; } = string.Empty;
        [JsonIgnore]
        public virtual List<Expense>? Expense { get; set; }
        [JsonIgnore]
        public virtual List<RecurrentExpense>? RecurrentExpense { get; set; }

    }
}
