using BudgetApp.Models.Common_Models;

namespace BudgetApp.Models.ExpenseControllerModels
{
    public class DeteleExpenseModel
    {
        public int Id { get; set; }
    }
    public class DeteleExpenseModelAction
    {
        DeteleExpenseModel DeteleExpenseModel { get; set; }
        TableParameters? TableParameters { get; set; }
    }
}
