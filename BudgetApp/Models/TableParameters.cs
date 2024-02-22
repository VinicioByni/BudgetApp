namespace BudgetApp.Models
{
    public class TableParameters
    {
        public string periodInitialDate { get; set; } = string.Empty;
        public string searchString { get; set; } = string.Empty;
        public string searchDate { get; set; } = string.Empty;
        public string sortOption {  get; set; } = string.Empty;
        public string sortOrder { get; set; } = string.Empty;
        public int pageSize { get; set; }
        public int pageNumber { get; set; }
        public void setDefaultParameters()
        {
            pageSize = 5;
            pageNumber = 1;
            sortOption = "Date";
            sortOrder = "Desc";
        }
    }
}
