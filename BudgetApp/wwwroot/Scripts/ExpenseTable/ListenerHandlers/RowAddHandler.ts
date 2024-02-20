import { failMessage, successMessage } from "../../Services/messageHanlder.js"
import { CreateExpenseModel, EXPENSE_MODEL_STRINGS, EXPENSE_MODEL_PAYMENT_STRINGS, CreateExpenseModelAction } from '../Models/ModelTypes.js'
import { expenseTableFunctionality } from '../TableFunctionality.js'
import { parseToNullableFloat } from '../../Utils/parseUtils.js'
import { setAriaHiddenTrue, setAriaHiddenFalse } from "../../Utils/SetAttributeFunctions.js"
import { getTableParameters } from '../TableParameters/TableParameters.js'
import { getExpenseTable } from "./GetTableHandler.js"

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
        if (key === EXPENSE_MODEL_STRINGS.payment) {
            fillPaymentMethods(formDataObject, formData, key)
        }
        else {
            const value = formData.get(key)

            formDataObject[key] = value.toString()
        }
    }

    return formDataObject
}

function fillPaymentMethods(formDataObject: Record<string, string>, formData: FormData, key: string) {
    const paymentMethod = formData.get(key).toString().split('-', 1).join()
    const paymentMethodId = formData.get(key).toString().split('-').slice(1, 2).join()

    for (const paymentKey in EXPENSE_MODEL_PAYMENT_STRINGS) {
        if (paymentMethod === paymentKey) {
            formDataObject[paymentKey] = paymentMethodId
        }
        else {
            formDataObject[paymentKey] = null
        }
    }
}

function createExpenseModel(formDataObject: Record<string, string>): CreateExpenseModel {
    /* parseToNullableFloat is used to simplify the data sent to the api
        by either sending a string | number | null */
    const expenseDataModel: CreateExpenseModel = {
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

async function fetchExpenseAddFormData(expenseData: CreateExpenseModel) {

    const url = 'Expense/AddExpense' // Separate later to endpoint url folder
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(expenseData)
    })
    if (response.ok) {
        getExpenseTable()
        successMessage('Expense added')
    }
    else {
        failMessage('Expense was not added')
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