using System.ComponentModel.DataAnnotations;

namespace BudgetApp.Models
{
    public class Budget
    {
        public int Id { get; set; }
        [DataType(DataType.Currency)]
        [DisplayFormat(DataFormatString = "{0:C0}")]
        public decimal Amount { get; set; }
    }
}
