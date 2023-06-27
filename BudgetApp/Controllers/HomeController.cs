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

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Accounts()
        {
            return View();
        }

        public IActionResult Categories()
        {
            return View();
        }

        public IActionResult ExpensesPartial()
        {
            return PartialView();
        }

        [HttpGet]
     
        public async Task<IActionResult> GetExpensesPartial()
        {
            var expenses = await _budgetDbContext.Expenses.Include(e => e.CreditCard).Include(e => e.Account).Include(e => e.ExpenseCategory).Include(e => e.Debt).ToListAsync();
            return PartialView("_ExpensesPartial", expenses);
        }

        // CREDIT CARDS
        [HttpGet]
        [ActionName("GetCreditCardsPartial")]
        public async Task<IActionResult> GetCreditCardsPartial()
        {
            var creditCards = await _budgetDbContext.CreditCards.ToListAsync();
            return PartialView("_CreditCardsPartial", creditCards);
        }

        [HttpGet]
        public async Task<IActionResult> GetCreditCards()
        {
            var creditCards = await _budgetDbContext.CreditCards.ToListAsync();
            return Json(creditCards);
        }

        [HttpPost]
        [ActionName("AddCreditCard")]
        public async Task<IActionResult> AddCreditCard(CreditCard creditCard)
        {
            if (creditCard == null)
            {
                return RedirectToAction(nameof(Index));
            }
            _budgetDbContext.CreditCards.Add(creditCard);
            await _budgetDbContext.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        [HttpPost]
        [ActionName("EditCreditCard")]
        public async Task<IActionResult> EditCreditCard(CreditCard creditCard)
        {
            var dBCreditCard = await _budgetDbContext.CreditCards.FirstOrDefaultAsync(c => c.CreditCardId == creditCard.CreditCardId);
            if (dBCreditCard == null)
            {
                return RedirectToAction(nameof(Index));
            }
            dBCreditCard.Name = creditCard.Name;
            dBCreditCard.CreditLimit = creditCard.CreditLimit;
            dBCreditCard.AutoPayment = creditCard.AutoPayment;
            dBCreditCard.CutOffDate = creditCard.CutOffDate;
            dBCreditCard.DueDate = creditCard.DueDate;
            

            _budgetDbContext.CreditCards.Update(dBCreditCard);
            await _budgetDbContext.SaveChangesAsync();
            return RedirectToAction("GetCreditCardsPartial");
        }

        [HttpPost]
        [ActionName("EditCreditCardAmountOwed")]
        public async Task<IActionResult> EditCreditCardAmountOwed(CreditCard creditCard)
        {
            var dBCreditCard = await _budgetDbContext.CreditCards.FirstOrDefaultAsync(c => c.CreditCardId == creditCard.CreditCardId);
            if (dBCreditCard == null)
            {
                return RedirectToAction(nameof(Index));
            }
            
            dBCreditCard.AmountOwed = creditCard.AmountOwed;

            _budgetDbContext.CreditCards.Update(dBCreditCard);
            await _budgetDbContext.SaveChangesAsync();
            return RedirectToAction("GetCreditCardsPartial");
        }

        [HttpDelete]
        [ActionName("DeleteCreditCard")]
        public async Task<IActionResult> DeleteCreditCard(CreditCard creditCard)
        {
            var dBCreditCard = await _budgetDbContext.CreditCards.FirstOrDefaultAsync(c => c.CreditCardId == creditCard.CreditCardId);
            if (dBCreditCard == null)
            {
                return RedirectToAction(nameof(Index));
            }

            _budgetDbContext.CreditCards.Remove(dBCreditCard);
            await _budgetDbContext.SaveChangesAsync();
            return RedirectToAction("GetCreditCardsPartial");
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}