import { ExpenseModel, EXPENSE_MODEL_STRINGS, EXPENSE_MODEL_PAYMENT_STRINGS } from '../Models/ModelTypes.js'


export function handleRowUpdate(form: HTMLFormElement) {
    const formData = new FormData(form)

    const formDataObject = parseExpenseFormData(formData)
    const expenseDataModel = createExpenseModel(formDataObject)

    /* Add fetch and take care of promises etc, if there is an error, 
    call a function that takes care of errors, later on maybe create 
    a generic error function that can be used by multiple thinks on the project,
    but wait until multiple things need the errors, to make sure I understand 
    what I need before refactoring the code */
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
function parseToNullableFloat(value: string) {
    const parsedValue = parseFloat(value)

    if (isNaN(parsedValue)) return null
    else return parsedValue
} 
async function fetchExpenseFormDataUpdate(expenseData: ExpenseModel) {
    const url = 'Expense/EditExpense'
    const response = await fetch(url, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(expenseData)
    })
    // work on getting the html and updating it, with the table functionality
    
}
