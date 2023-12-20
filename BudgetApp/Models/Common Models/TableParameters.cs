namespace BudgetApp.Models.Common_Models
{
    public class TableParameters
    {
        public string periodInitialDate { get; set; } = string.Empty;
        public string searchString { get; set; } = string.Empty;
        public string searchDate { get; set; } = string.Empty;
        public string sort { get; set; } = string.Empty;
        public int pageSize { get; set; }
        public int pageNumber { get; set; }
        public void setDefaultParameters()
        {
            pageSize = 5;
            pageNumber = 1;
        }
        public void setDefaultPageSize()
        {
            pageSize = 5;
        }
        public void setDefaultPageNumber()
        {
            pageNumber = 1;
        }
    }
}
