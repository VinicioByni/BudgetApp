import { getBudget, setNewBudget } from '../../BudgetApi/FetchBudget.js'
import { FinancialState } from '../../FinancialState/FinancialState.js'

const budgetTile = document.querySelector('.tile-budget')
const budgetDisplay = budgetTile.querySelector('h5')
const amountLeftDisplay = budgetTile.querySelector('h4')
const budgetStatus = document.querySelector('.budget-status')
const budgetForm = budgetTile.querySelector('form')
const saveBudgetBtn = budgetTile.querySelector('button')


budgetTile.addEventListener('click', function () {
    enableEditBudgetMode()
})

budgetForm.addEventListener('submit', function (event) {
    event.preventDefault()

    if (event.target instanceof HTMLFormElement) {
        const formData = new FormData(event.target);
        const amount = formData.get('amount')

        setNewBudget(amount)
    }

    disableEditBudgetMode()
})

function enableEditBudgetMode() {
    saveBudgetBtn.style.display = "block"
    budgetForm.style.display = "block"
    budgetDisplay.style.display = "none"
}

function disableEditBudgetMode() {
    saveBudgetBtn.style.display = "none"
    budgetForm.style.display = "none"
    budgetDisplay.style.display = "block"
}

export function updateBudgetAmountDisplay() {
    const budgetAmount = FinancialState.getState().budget
    budgetDisplay.innerHTML = "Budget: " + budgetAmount
}

export function updateBudgetAmountLeftDisplay() {
    const budgetAmount = FinancialState.getState().budget
    const expensesAmount = FinancialState.getState().totalExpenses
    const difference = budgetAmount - expensesAmount

    amountLeftDisplay.innerHTML = "$" + difference.toFixed(1)

    if (difference <= 0) {
        // Add class to be red
        budgetTile.classList.remove('tile-budget-success')
        budgetTile.classList.add('tile-budget-danger')

        budgetStatus.innerHTML = 'Past Budget'
    }
    else {
        // Remove class
        budgetTile.classList.remove('tile-budget-danger')
        budgetTile.classList.add('tile-budget-success')

        budgetStatus.innerHTML = 'Available'
    }
}



    

