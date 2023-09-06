import { FinancialState } from '../FinancialState/FinancialState.js'
import { updateBudgetAmountDisplay, updateBudgetAmountLeftDisplay } from '../Tiles/Budget Tile/BudgetTile.js'
import { GET_BUDGET_URL_ENDPOINT, createUpdateBudgetUrlEndpoint } from './BudgetApiUrlEndpoints.js'


export const getBudget = async function () {
    try {
        const response = await fetch(GET_BUDGET_URL_ENDPOINT)
        if (!response.ok) {
            throw new Error("get budget network response was not ok")
        }
        else {
            const budget = await response.json()
            return budget           
        }

    }
    catch (error) {
        console.error('get budget network error: ' + error)
    }
}


export const setNewBudget = async function (amount) {
    try {
        const response = await fetch(createUpdateBudgetUrlEndpoint(amount), {
            method: "POST"
        })
        if (!response.ok) {
            throw new Error("set new budget network response was not ok")
        }
        else {
            const budget = await response.json()
            FinancialState.updateBudget(budget.amount)
            updateBudgetAmountDisplay()
            updateBudgetAmountLeftDisplay()
        }

    }
    catch (error) {
        console.error('set new budget error: ' + error)
    }
   
}