using BudgetApp.Data;
using BudgetApp.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BudgetApp.Controllers
{
    
    public class IncomeController : Controller
    {
        private readonly BudgetDbContext _budgetDbContext;
        public IncomeController(BudgetDbContext budgetDbContext) 
        {
            _budgetDbContext = budgetDbContext;
        }

        [HttpGet]
        public IActionResult Index()
        {
            return View();
        }

        [HttpPost]
        [ActionName("Index")]
        public async Task<IActionResult> Add(FormsViewModel incomeRequest)
        {    
            if(incomeRequest.Income.Description == null) 
            { 
                incomeRequest.Income.Description = string.Empty;
            }

            _budgetDbContext.Incomes.Add(incomeRequest.Income);
            await _budgetDbContext.SaveChangesAsync();
            return View();
        }

        

    }
}
