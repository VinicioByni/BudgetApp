import { failMessage, successMessage } from "../../Services/messageHanlder.js"
import { parseToNullableFloat } from '../../Utils/parseUtils.js'
import { getExpenseTable } from "./GetTableHandler.js"

export function handleExpenseRowDeletion(form: HTMLFormElement) {
    const formData = new FormData(form)

    formData.forEach((value) => {
        const id = parseToNullableFloat(value.toString())

        fetchExpenseRowDataDeletion(id)
    })
}

async function fetchExpenseRowDataDeletion(id: number) {

    const partialViewContainer = document.querySelector('#ExpensePartialViewContainer')
    if (partialViewContainer == null) return Error('Expense partial view container not found')

    const url = 'Expense/DeleteExpense?id=' + id// Separate later to endpoint url folder
    const response = await fetch(url, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    })
    if (response.ok) {
        getExpenseTable()
        successMessage('Expense deleted')
       
    }
    else {
        failMessage('Expense was not deleted')
    }
    
}