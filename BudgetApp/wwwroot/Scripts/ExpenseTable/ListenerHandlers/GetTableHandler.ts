import { expenseTableFunctionality } from "../TableFunctionality.js"
import { getTableParameters, getUrlTableParameters } from "../TableParameters/TableParameters.js"

export async function getExpenseTable() {
    const partialViewContainer = document.querySelector('#ExpensePartialViewContainer')
    if (partialViewContainer == null) return Error('Expense partial view container not found')

    const urlTableParameters = getUrlTableParameters()
    const url = 'Expense/_ExpenseTablePartial?' + urlTableParameters
    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
    if (response.ok) {
        const partialView = await response.text()
        partialViewContainer.innerHTML = partialView
        expenseTableFunctionality()
    }
    else {
        throw new Error(`Get expense table error status: ${response.status}`)
    }
}