using BudgetApp.Models.Common_Models;

namespace BudgetApp.Models.ExpenseControllerModels
{
    public class DeleteExpenseModel
    {
        public int Id { get; set; }
    }
    public class DeleteExpenseModelAction
    {
        public DeleteExpenseModel DeleteExpenseModel { get; set; }
        public TableParameters? TableParameters { get; set; }
    }
}
