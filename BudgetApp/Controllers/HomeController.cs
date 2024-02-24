using BudgetApp.Data;
using BudgetApp.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics;

namespace BudgetApp.Controllers
{
    public class HomeController : Controller
    {       
        private readonly ILogger<HomeController> _logger;
        private readonly BudgetDbContext _budgetDbContext;

        public HomeController(ILogger<HomeController> logger, BudgetDbContext budgetDbContext)
        {
            _logger = logger;
            _budgetDbContext = budgetDbContext;
        }

        public async Task<IActionResult> Index()
        { 
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}