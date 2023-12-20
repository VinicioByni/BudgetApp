using BudgetApp.Data;
using BudgetApp.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

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
            ViewModel model = new ViewModel();
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
        [ActionName("_CreditCardsPartial")]
        public async Task<IActionResult> _CreditCardsPartial(string order)
        {
            ViewModel viewModel = new ViewModel();
            /* PENDING Try to add date restriction also*/

            if (order.IsNullOrEmpty())
            {
                viewModel.CreditCards = await _budgetDbContext.CreditCards
                .OrderBy(c => c.CurrentCutOffDate)
                .ToListAsync();
            }
            else
            {
                viewModel.CreditCards = await _budgetDbContext.CreditCards
                .OrderByDescending(c => c.CurrentCutOffDate)
                .ToListAsync();
            }

            
            /*Dictionary<int, float> totalAmountOwed = new Dictionary<int, float>();*/
            // Get total amount 
            return PartialView("~/Views/Shared/Partial Views/_CreditCardsPartial.cshtml", viewModel);
        }

        [HttpGet]
        [ActionName("CreditCardsAmountOwedJson")]
        public async Task<IActionResult> CreditCardsJson()
        {
            ViewModel viewModel = new ViewModel();
            viewModel.CreditCards = await _budgetDbContext.CreditCards.ToListAsync();

            viewModel.Expenses = await _budgetDbContext.Expenses
                .Where(e => e.CreditCardId != null)
                .Where(e => e.Date > e.CreditCard.LastCutOffDate && e.Date <= e.CreditCard.CurrentCutOffDate).Include(e => e.CreditCard).ToListAsync();

            Dictionary<string, decimal?> amountOwedDict = new Dictionary<string, decimal?>();

            foreach(var creditCard in viewModel.CreditCards)
            {
                amountOwedDict[$"{creditCard.CreditCardId}"] = 0 - creditCard.AmountPaid;
            }

            foreach (Expense expense in viewModel.Expenses)
            {
                if (amountOwedDict.TryGetValue($"{expense.CreditCardId}", out decimal? amount))
                {
                    amountOwedDict[$"{expense.CreditCardId}"] = amount + expense.Amount;
                }
                else
                {
                    amountOwedDict[$"{expense.CreditCardId}"] = expense.Amount;
                }
            }

            return Json(amountOwedDict);
        }

        [HttpGet]
        [ActionName("GetCreditCardColor")]
        public async Task<IActionResult> GetCreditCardColor()
        {
            var colors = await _budgetDbContext.CreditCards.ToListAsync(); /*.Select(c => new Color() { id = c.CreditCardId, color = c.Color}).ToListAsync();*/
            return Json(colors);
        }


        [HttpPost]
        [ActionName("AddCreditCard")]
        public async Task<IActionResult> AddCreditCard(CreditCard creditCard)
        {
            ViewModel viewModel = new ViewModel();

            if (creditCard == null)
            {
                return RedirectToAction(nameof(Index));
            }
            _budgetDbContext.CreditCards.Add(creditCard);
            await _budgetDbContext.SaveChangesAsync();

            viewModel.CreditCards = await _budgetDbContext.CreditCards
                .OrderBy(c => c.CurrentCutOffDate)
                .ToListAsync();

            return PartialView("_CreditCardsPartial", viewModel);
        }

        [HttpPost]
        [ActionName("EditCreditCard")]
        public async Task<IActionResult> EditCreditCard(CreditCard creditCard)
        {
            ViewModel viewModel = new ViewModel();

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
            dBCreditCard.Color = creditCard.Color.Remove(0, 1);


            _budgetDbContext.CreditCards.Update(dBCreditCard);
            await _budgetDbContext.SaveChangesAsync();

            viewModel.CreditCards = await _budgetDbContext.CreditCards
                .OrderBy(c => c.CurrentCutOffDate)
                .ToListAsync();
            return PartialView("_CreditCardsPartial", viewModel);
        }

        [HttpPost]
        [ActionName("EditCreditCardAmountOwed")]
        public async Task<IActionResult> EditCreditCardAmountOwed(CreditCard creditCard)
        {
            ViewModel viewModel = new ViewModel();

            var dBCreditCard = await _budgetDbContext.CreditCards.FirstOrDefaultAsync(c => c.CreditCardId == creditCard.CreditCardId);
            if (dBCreditCard == null)
            {
                return RedirectToAction(nameof(Index));
            }

            dBCreditCard.AmountPaid += creditCard.AmountPaid;

            _budgetDbContext.CreditCards.Update(dBCreditCard);
            await _budgetDbContext.SaveChangesAsync();

            viewModel.CreditCards = await _budgetDbContext.CreditCards
                .OrderBy(c => c.CurrentCutOffDate)
                .ToListAsync();

            return PartialView("_CreditCardsPartial", viewModel);
        }

        [HttpDelete]
        [ActionName("DeleteCreditCard")]
        public async Task<IActionResult> DeleteCreditCard(CreditCard creditCard)
        {
            ViewModel viewModel = new ViewModel();
            var dBCreditCard = await _budgetDbContext.CreditCards.FirstOrDefaultAsync(c => c.CreditCardId == creditCard.CreditCardId);
            if (dBCreditCard == null)
            {
                return RedirectToAction(nameof(Index));
            }

            _budgetDbContext.CreditCards.Remove(dBCreditCard);
            await _budgetDbContext.SaveChangesAsync();

            viewModel.CreditCards = await _budgetDbContext.CreditCards
                .OrderBy(c => c.CurrentCutOffDate)
                .ToListAsync();
            return PartialView("_CreditCardsPartial", viewModel);
        }
    }
}
