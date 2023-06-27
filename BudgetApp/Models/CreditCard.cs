using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

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
        public float? AmountOwed { get; set; }
        public float CreditLimit { get; set; }
        public bool AutoPayment { get; set; }
        [JsonIgnore]
        public virtual List<Expense>? Expense { get; set; }
        public virtual List<RecurrentExpense>? RecurrentExpense { get; set; }
    }
}
