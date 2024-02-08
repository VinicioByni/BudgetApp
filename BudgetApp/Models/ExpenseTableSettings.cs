using Microsoft.Identity.Client;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BudgetApp.Models
{
    public class ExpenseTableSettings
    {
        public string SortBy { get; set; }
        public string FilterByStringSearch { get; set; }
        public string FilterByDateSearch { get; set; }
        public int RowsPerPage { get; set; }
        public int PageNumber {  get; set; }
        public ExpenseTableSettings()
        {
            SortBy = "Date ASC";
            FilterByStringSearch = string.Empty;
            FilterByDateSearch = string.Empty;
            RowsPerPage = 5;
            PageNumber = 1;
        }
    }
}
