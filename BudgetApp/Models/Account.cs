using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

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
        [JsonIgnore]
        public virtual List<Expense>? Expense { get; set; }
        public virtual List<Income>? Income { get; set; }
        public virtual List<RecurrentExpense>? RecurrentExpense { get; set; }
    }
}
