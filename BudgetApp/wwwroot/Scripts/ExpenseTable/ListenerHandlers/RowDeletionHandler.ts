import { failedDeletionMessage, successfullDeletionMessage } from "../../Services/messageHanlder.js"
import { expenseTableFunctionality } from "../TableFunctionality.js"
import { parseToNullableFloat } from '../../Utils/parseUtils.js'
import { DeleteExpenseModel, DeleteExpenseModelAction } from "../Models/ModelTypes.js"
import { getTableParameters } from "../TableParameters/TableParameters.js"

export function handleExpenseRowDeletion(form: HTMLFormElement) {
    const formData = new FormData(form)

    formData.forEach((value) => {
        const id = parseToNullableFloat(value.toString())
        const dataId: DeleteExpenseModel = { 'id': id }

        fetchExpenseRowDataDeletion(dataId)

    })
}



async function fetchExpenseRowDataDeletion(dataId: DeleteExpenseModel) {

    const deleteExpenseModelAction: DeleteExpenseModelAction = {
        DeleteExpenseModel: dataId,
        TableParameters: getTableParameters()
    }

    const partialViewContainer = document.querySelector('#ExpensePartialViewContainer')
    if (partialViewContainer == null) return Error('Expense partial view container not found')

    const url = 'Expense/DeleteExpense' // Separate later to endpoint url folder
    const response = await fetch(url, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(deleteExpenseModelAction)
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