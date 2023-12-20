import { failedChangeMessage, successfullChangeMessage } from '../../Services/messageHanlder.js'
import { ExpenseModel, EXPENSE_MODEL_STRINGS, EXPENSE_MODEL_PAYMENT_STRINGS } from '../Models/ModelTypes.js'
import { expenseTableFunctionality } from '../TableFunctionality.js'
import { parseToNullableFloat } from '../../Utils/parseUtils.js'
import { setAriaHiddenTrue, setAriaHiddenFalse, setTabIndexFalse, setTabIndexTrue } from '../../Utils/SetAttributeFunctions.js'

export function handleExpenseRowUpdate(form: HTMLFormElement) {
    const formData = new FormData(form)

    const formDataObject = parseExpenseFormData(formData)
    const expenseDataModel = createExpenseModel(formDataObject)

    fetchExpenseFormDataUpdate(expenseDataModel)
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

function createExpenseModel(formDataObject: Record<string, string>): ExpenseModel {
    /* parseToNullableFloat is used to simplify the data sent to the api
        by either sending a string | number | null */
    const expenseDataModel: ExpenseModel = {
        id: parseToNullableFloat(formDataObject[EXPENSE_MODEL_STRINGS.id]),
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

async function fetchExpenseFormDataUpdate(expenseData: ExpenseModel) {

    const partialViewContainer = document.querySelector('#ExpensePartialViewContainer')
    if (partialViewContainer == null) return Error('Expense partial view container not found')

    const url = 'Expense/EditExpense' // Separate later to endpoint url folder
    const response = await fetch(url, {
        method: "PUT",
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

export function openEditing(editBtn: HTMLButtonElement) {
    if (editBtn == null || !(editBtn instanceof HTMLButtonElement)) return

    const row: HTMLTableRowElement = editBtn.closest('table tr')
    if (!(row instanceof HTMLTableRowElement) || row == null) return

    const tableData = row.querySelectorAll('.td')
    tableData.forEach(td => setAriaHiddenTrue(td))

    const labels = row.querySelectorAll('label')
    const inputs = row.querySelectorAll('input')
    const selects = row.querySelectorAll('select')

    labels.forEach(label => setAriaHiddenFalse(label))
    inputs.forEach(input => { setAriaHiddenFalse(input); setTabIndexTrue(input) })
    selects.forEach(select => { setAriaHiddenFalse(select); setTabIndexTrue(select) })

    setAriaHiddenTrue(editBtn)
    setTabIndexFalse(editBtn)

    const detailsBtn = row.querySelector('.details-btn')
    if ((detailsBtn instanceof HTMLButtonElement) && detailsBtn != null) {
        setAriaHiddenTrue(detailsBtn)
        setTabIndexFalse(detailsBtn)
    }

    const saveBtn = row.querySelector('.save-btn')
    if ((saveBtn instanceof HTMLButtonElement) && saveBtn != null) {
        setAriaHiddenFalse(saveBtn)
        setTabIndexTrue(saveBtn)
    }

    const cancelBtn = row.querySelector('.cancel-btn')
    if ((cancelBtn instanceof HTMLButtonElement) && cancelBtn != null) {
        setAriaHiddenFalse(cancelBtn)
        setTabIndexTrue(cancelBtn)
    }
}

export function cancelEditing(cancelBtn: HTMLButtonElement) {
    if (cancelBtn == null || !(cancelBtn instanceof HTMLButtonElement)) return

    const row: HTMLTableRowElement = cancelBtn.closest('table tr')
    if (!(row instanceof HTMLTableRowElement) || row == null) return

    const labels = row.querySelectorAll('label')
    const inputs = row.querySelectorAll('input')
    const selects = row.querySelectorAll('select')

    labels.forEach(label => setAriaHiddenTrue(label))
    inputs.forEach(input => { setAriaHiddenTrue(input); setTabIndexFalse(input) })
    selects.forEach(select => { setAriaHiddenTrue(select); setTabIndexFalse(select) })

    const tableData = row.querySelectorAll('.td')
    tableData.forEach(td => setAriaHiddenFalse(td))

    const saveBtn = row.querySelector('.save-btn')
    if ((saveBtn instanceof HTMLButtonElement) && saveBtn != null) {
        setAriaHiddenTrue(saveBtn)
        setTabIndexFalse(saveBtn)
    }

    setAriaHiddenTrue(cancelBtn)
    setTabIndexFalse(cancelBtn)

    const editBtn = row.querySelector('.edit-btn')
    if ((editBtn instanceof HTMLButtonElement) && editBtn != null) {
        setAriaHiddenFalse(editBtn)
        setTabIndexTrue(editBtn)
    }

    const detailsBtn = row.querySelector('.details-btn')
    if ((detailsBtn instanceof HTMLButtonElement) && detailsBtn != null) {
        setAriaHiddenFalse(detailsBtn)
        setTabIndexTrue(detailsBtn)
    }

}