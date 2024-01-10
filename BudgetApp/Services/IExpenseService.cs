using BudgetApp.DTOs;
using BudgetApp.Models;
using BudgetApp.Models.Common_Models;
using Microsoft.AspNetCore.Mvc;

namespace BudgetApp.Services
{
    public interface IExpenseService
    {
        public Task<ViewModel> Get(TableParameters tableParameters);
        public Task<ExpenseDto> GetById(int id);
        public Task<ExpenseDto> Add(ExpenseAddDto expenseAddDto);
        public Task<ExpenseDto> Update(ExpenseUpdateDto expenseUpdateDto);
        public Task<ExpenseDto> DeleteById(int id);
    }
}
