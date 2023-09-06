import { setNewBudget } from '../../BudgetApi/FetchBudget.js';
import { FinancialState } from '../../FinancialState/FinancialState.js';
var budgetTile = document.querySelector('.tile-budget');
var budgetDisplay = budgetTile.querySelector('h5');
var amountLeftDisplay = budgetTile.querySelector('h4');
var budgetStatus = document.querySelector('.budget-status');
var budgetForm = budgetTile.querySelector('form');
var saveBudgetBtn = budgetTile.querySelector('button');
budgetTile.addEventListener('click', function () {
    enableEditBudgetMode();
});
budgetForm.addEventListener('submit', function (event) {
    event.preventDefault();
    if (event.target instanceof HTMLFormElement) {
        var formData = new FormData(event.target);
        var amount = formData.get('amount');
        setNewBudget(amount);
    }
    disableEditBudgetMode();
});
function enableEditBudgetMode() {
    saveBudgetBtn.style.display = "block";
    budgetForm.style.display = "block";
    budgetDisplay.style.display = "none";
}
function disableEditBudgetMode() {
    saveBudgetBtn.style.display = "none";
    budgetForm.style.display = "none";
    budgetDisplay.style.display = "block";
}
export function updateBudgetAmountDisplay() {
    var budgetAmount = FinancialState.getState().budget;
    budgetDisplay.innerHTML = "Budget: " + budgetAmount;
}
export function updateBudgetAmountLeftDisplay() {
    var budgetAmount = FinancialState.getState().budget;
    var expensesAmount = FinancialState.getState().totalExpenses;
    var difference = budgetAmount - expensesAmount;
    amountLeftDisplay.innerHTML = "$" + difference.toFixed(1);
    if (difference <= 0) {
        // Add class to be red
        budgetTile.classList.remove('tile-budget-success');
        budgetTile.classList.add('tile-budget-danger');
        budgetStatus.innerHTML = 'Past Budget';
    }
    else {
        // Remove class
        budgetTile.classList.remove('tile-budget-danger');
        budgetTile.classList.add('tile-budget-success');
        budgetStatus.innerHTML = 'Available';
    }
}
//# sourceMappingURL=BudgetTile.js.map