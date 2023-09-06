using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BudgetApp.Models
{
    public class Income
    {
        [Key]
        public int Id { get; set; }
        public decimal Amount { get; set; }
        [DisplayFormat(DataFormatString = "{0:ddd d MMM yyyy}")]
        public DateTime Date { get; set; }
        [StringLength(40)]
        public string Description { get; set; } = string.Empty;

        [ForeignKey("IncomeCategory")]
        public int? IncomeCategoryId { get; set; }
        public virtual IncomeCategory? IncomeCategory { get; set; }

        [ForeignKey("Account")]
        public int? AccountId { get; set; }
        public virtual Account? Account { get; set; }

    }
}
