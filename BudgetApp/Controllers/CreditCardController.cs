using BudgetApp.Data;
using BudgetApp.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BudgetApp.Controllers
{
    public class CreditCardController : Controller
    {
        private readonly BudgetDbContext _budgetDbContext;

        public CreditCardController(BudgetDbContext budgetDbContext)
        {
            _budgetDbContext = budgetDbContext;
        }

        public async Task<IActionResult> Index()
        {
            FormsViewModel model = new FormsViewModel();
            model.ExpenseCategories = await _budgetDbContext.ExpenseCategories.ToListAsync();
            model.Accounts = await _budgetDbContext.Accounts.ToListAsync();
            model.CreditCards = await _budgetDbContext.CreditCards.ToListAsync();
            model.Debts = await _budgetDbContext.Debts.ToListAsync();
            model.Expenses = await _budgetDbContext.Expenses.ToListAsync();
            // Recurrent Expneses
            model.Incomes = await _budgetDbContext.Incomes.Include(e => e.Account).Include(e => e.IncomeCategory).ToListAsync();
            return View(model);
        }

        // CREDIT CARDS
        [HttpGet]
        [ActionName("GetCreditCardsPartial")]
        public async Task<IActionResult> GetCreditCardsPartial()
        {
            FormsViewModel viewModel = new FormsViewModel();
            viewModel.CreditCards = await _budgetDbContext.CreditCards.ToListAsync();
            viewModel.Expenses = await _budgetDbContext.Expenses.ToListAsync();
            return PartialView("_CreditCardsPartial", viewModel);
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
            return Json(creditCard);
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
            dBCreditCard.CurrentCutOffDate = creditCard.CurrentCutOffDate;
            dBCreditCard.LastCutOffDate = creditCard.LastCutOffDate;
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

            dBCreditCard.AmountPaid += creditCard.AmountPaid;

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
    }
}
