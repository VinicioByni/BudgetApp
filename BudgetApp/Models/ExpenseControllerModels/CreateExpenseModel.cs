using BudgetApp.Models.Common_Models;
using System.ComponentModel.DataAnnotations;

namespace BudgetApp.Models.ExpenseControllerModels
{
    public class CreateExpenseModelAction
    {
        public Expense CreateExpenseModel { get; set; }
        public TableParameters? TableParameters { get; set; }
    }
}
