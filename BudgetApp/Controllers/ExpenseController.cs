
using BudgetApp.Data;
using BudgetApp.Models;
using BudgetApp.Models.Expense_Models;
using BudgetApp.Models.Common_Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Linq;
using BudgetApp.DTOs;
using BudgetApp.Services;

namespace BudgetApp.Controllers
{
    

    public class ExpenseController : Controller
    {
        private readonly IExpenseService _expenseService;
        public ExpenseController(IExpenseService expenseService)
        {
            _expenseService = expenseService;
        }

        [HttpGet]
        [ActionName("_ExpenseTablePartial")]
        public async Task<PartialViewResult> Get([FromQuery]TableParameters tableParameters)
        {
            if (tableParameters == null)
            {
                tableParameters = new TableParameters();
                tableParameters.setDefaultParameters();
            }

            var expenseTablePartialViewModel = await _expenseService.Get(tableParameters);

            return PartialView("~/Views/Shared/Partial Views/_ExpenseTablePartial.cshtml", expenseTablePartialViewModel);
        }

        [HttpGet]
        [ActionName("ExpenseGetById")]
        public async Task<ActionResult<ExpenseDto>> GetById(int id)
        {
            
            var expenseDto = await _expenseService.GetById(id);
            if (expenseDto == null) { NotFound(); }
            return Ok(expenseDto);
        }

        [HttpPost]
        [ActionName("AddExpense")]
        public async Task<ActionResult<ExpenseDto>> Add([FromBody]ExpenseAddDto expenseAddDto)
        {
            // PENDING Add validation

            if (expenseAddDto.Description == null)
            {
                expenseAddDto.Description = string.Empty;
            }

            int descriptionMaxLength = 40;
            if (expenseAddDto.Description.Length > descriptionMaxLength)
            {
                expenseAddDto.Description = expenseAddDto.Description.Substring(0, descriptionMaxLength);
            }

            var expenseDto = await _expenseService.Add(expenseAddDto);
            

            return Ok(expenseDto);
        }

        [HttpPut]
        [ActionName("UpdateExpense")]
        public async Task<ActionResult<ExpenseDto>> Update([FromBody]ExpenseUpdateDto expenseUpdateDto)
        {
            // PENDING Add validation

            // PENDING move this description length section to validation service later
            if (expenseUpdateDto.Description == null)
            {
                expenseUpdateDto.Description = string.Empty;
            }

            int descriptionMaxLength = 40;
            if (expenseUpdateDto.Description.Length > descriptionMaxLength)
            {
                expenseUpdateDto.Description = expenseUpdateDto.Description.Substring(0, descriptionMaxLength);
            }

            var expenseDto = await _expenseService.Update(expenseUpdateDto);

            if (expenseDto == null)
            {
                return NotFound();
            }

            return Ok(expenseDto);
        }    


        [HttpDelete]
        [ActionName("DeleteExpense")]
        public async Task<ActionResult<ExpenseDto>> DeleteById(int id)
        {
            // PENDING Add validation
            var expenseDto = await _expenseService.DeleteById(id);

            if (expenseDto == null)
            {
                return NotFound();
            }

            return Ok(expenseDto);
        }
    }
}
