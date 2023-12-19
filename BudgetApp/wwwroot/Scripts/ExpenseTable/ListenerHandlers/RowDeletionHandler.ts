import { failedDeletionMessage, successfullDeletionMessage } from "../../Services/messageHanlder.js"
import { expenseTableFunctionality } from "../TableFunctionality.js"
import { parseToNullableFloat } from '../../Utils/parseUtils.js'
import { ExpenseModelId } from "../Models/ModelTypes.js"

export function handleExpenseRowDeletion(form: HTMLFormElement) {
    const formData = new FormData(form)

    formData.forEach((value, key) => {
       
     
        const id = parseToNullableFloat(value.toString())
        const dataId: ExpenseModelId = { 'id': id}
        fetchExpenseRowDataDeletion(dataId)

    })
}



async function fetchExpenseRowDataDeletion(dataId: ExpenseModelId) {
    const partialViewContainer = document.querySelector('#ExpensePartialViewContainer')
    if (partialViewContainer == null) return Error('Expense partial view container not found')

    const url = 'Expense/DeleteExpense' // Separate later to endpoint url folder
    const response = await fetch(url, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dataId)
    })
    if (response.ok) {
        const partialView = await response.text()
        partialViewContainer.innerHTML = partialView
        expenseTableFunctionality()
        successfullDeletionMessage('')
       
    }
    else {
        failedDeletionMessage('')
    }
    
}