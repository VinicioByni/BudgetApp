import { failedChangeMessage, successfullChangeMessage } from '../../Services/messageHanlder.js'
import { ExpenseModel, EXPENSE_MODEL_STRINGS, EXPENSE_MODEL_PAYMENT_STRINGS } from '../Models/ModelTypes.js'
import { expenseTableFunctionality } from '../TableFunctionality.js'
import { parseToNullableFloat } from '../../Utils/parseUtils.js'
import { setAriaHiddenTrue, setAriaHiddenFalse } from "../../Utils/SetAttributeFunctions.js"

export function handleExpenseAddRow(form: HTMLFormElement) {
    const formData = new FormData(form)

    const formDataObject = parseExpenseFormData(formData)
    const expenseDataModel = createExpenseModel(formDataObject)

    fetchExpenseAddFormData(expenseDataModel)
}

function parseExpenseFormData(formData: FormData): Record<string, string> {

    const formDataObject: Record<string, string> = {}

    for (const key in EXPENSE_MODEL_STRINGS) {
        if (!(formData.has(key))) {
            formDataObject[key] = null
            continue
        }

        const value = formData.get(key)

        formDataObject[key] = value.toString()
        
    }

    return formDataObject
}

function createExpenseModel(formDataObject: Record<string, string>): ExpenseModel {
    /* parseToNullableFloat is used to simplify the data sent to the api
        by either sending a string | number | null */
    const expenseDataModel: ExpenseModel = {
        id: parseFloat(formDataObject[EXPENSE_MODEL_STRINGS.id]) || 0,
        amount: parseFloat(formDataObject[EXPENSE_MODEL_STRINGS.amount]) || 0,
        date: formDataObject[EXPENSE_MODEL_STRINGS.date] || getFormattedCurrentDate(),
        expenseCategoryId: parseToNullableFloat(formDataObject[EXPENSE_MODEL_STRINGS.expenseCategoryId]),
        description: formDataObject[EXPENSE_MODEL_STRINGS.description] || '',
        accountId: parseToNullableFloat(formDataObject[EXPENSE_MODEL_PAYMENT_STRINGS.accountId]),
        creditCardId: parseToNullableFloat(formDataObject[EXPENSE_MODEL_PAYMENT_STRINGS.creditCardId]),
        debtId: parseToNullableFloat(formDataObject[EXPENSE_MODEL_PAYMENT_STRINGS.debtId])
    }

    return expenseDataModel
}

function getFormattedCurrentDate(): string {
    const date = new Date()
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()

    const currentDate = `${year}-${month}-${day}`
    return currentDate
}

async function fetchExpenseAddFormData(expenseData: ExpenseModel) {

    const partialViewContainer = document.querySelector('#ExpensePartialViewContainer')
    if (partialViewContainer == null) return Error('Expense partial view container not found')
    console.log(expenseData)
    const url = 'Expense/AddExpense' // Separate later to endpoint url folder
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(expenseData)
    })
    if (response.ok) {
        const partialView = await response.text()
        partialViewContainer.innerHTML = partialView
        expenseTableFunctionality()
        successfullChangeMessage('')
    }
    else {
        failedChangeMessage('')
    }
}

export function closeAddForm(table: HTMLTableElement) {
    const addFormRow = table.querySelector('.expense-add-row')
    console.log(addFormRow)
    if (addFormRow == null || !(addFormRow instanceof HTMLTableRowElement)) return

    setAriaHiddenTrue(addFormRow)
}

export function openAddForm(table: HTMLTableElement) {
    const addFormRow = table.querySelector('.expense-add-row')
    if (addFormRow == null || !(addFormRow instanceof HTMLTableRowElement)) return

    setAriaHiddenFalse(addFormRow)
}