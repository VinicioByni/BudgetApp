using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

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
        [JsonIgnore]
        public virtual List<Expense>? Expense { get; set; }
        public virtual List<RecurrentExpense>? RecurrentExpense { get; set; }

    }
}
