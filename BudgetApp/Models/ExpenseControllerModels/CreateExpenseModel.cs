using BudgetApp.Models.Common_Models;

namespace BudgetApp.Models.ExpenseControllerModels
{
    public class CreateExpenseModel
    {
        public int Id { get; set; }
    }
    public class CreateExpenseModelAction
    {
        public CreateExpenseModel CreateExpenseModel { get; set; }
        public TableParameters? TableParameters { get; set; }
    }
}
