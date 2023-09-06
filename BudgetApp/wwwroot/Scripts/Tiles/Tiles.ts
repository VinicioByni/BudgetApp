import { ExpensesTotalAmountFetch, IncomesTotalAmountFetch } from '../ExpensesApi/FetchExpensesTotalAmount.js'
import { safeParseFloat } from '../Utilities/ParseUtilities.js'
import { getBudget } from '../BudgetApi/FetchBudget.js'
import { updateBudgetAmountDisplay, updateBudgetAmountLeftDisplay } from '../Tiles/Budget Tile/BudgetTile.js'
import { FinancialState } from '../FinancialState/FinancialState.js'

const netTotalAmountDisplay = document.querySelector('.net-total-amount')
const expenseTotalAmountDisplay = document.querySelector('.expense-total-amount')
const incomeTotalAmountDisplay = document.querySelector('.income-total-amount')

export async function updateAllTileAmounts() {
    await updateIncomeTileAmount()
    await updateExpenseAndBudgetTileAmount()
    updateNetTileAmount()
}

export async function updateIncomeTileAmount() {
    const incomesTotalAmountResponse: number = await IncomesTotalAmountFetch()
    FinancialState.updateTotalIncomes(incomesTotalAmountResponse)

    const incomesTotalAmount = FinancialState.getState().totalIncomes
    incomeTotalAmountDisplay.innerHTML = "$" + incomesTotalAmount.toFixed(1)
}

export async function updateExpenseAndBudgetTileAmount() {
    const expensesTotalAmountResponse:number = await ExpensesTotalAmountFetch()
    FinancialState.updateTotalExpenses(expensesTotalAmountResponse)

    const budget = await getBudget()
    FinancialState.updateBudget(budget.amount)

    const expensesTotalAmount = FinancialState.getState().totalExpenses
    expenseTotalAmountDisplay.innerHTML = "$" + expensesTotalAmount.toFixed(1)

    updateBudgetAmountDisplay()
    updateBudgetAmountLeftDisplay()
}

export async function updateNetTileAmount() {
    const incomesTotalAmount = FinancialState.getState().totalIncomes
    const expensesTotalAmount = FinancialState.getState().totalExpenses
    const netTotalAmount = (incomesTotalAmount - expensesTotalAmount)

    netTotalAmountDisplay.innerHTML = "$" + netTotalAmount.toFixed(1)

    
    if (netTotalAmount <= 0) {
        netTotalAmountDisplay.classList.remove('text-success')
        netTotalAmountDisplay.classList.add('text-danger')
    }
    else {
        netTotalAmountDisplay.classList.remove('text-danger')
        netTotalAmountDisplay.classList.add('text-success')
        
    }
}

updateAllTileAmounts()

const tilesTimePeriod = document.querySelectorAll('.tile-time-period')

export function updateTilesTimePeriod(datePeriodSelectedText) {

    tilesTimePeriod.forEach(tileTimePeriod => {
        tileTimePeriod.innerHTML = datePeriodSelectedText
    })
}




