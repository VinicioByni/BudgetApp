import { EXPENSE_MODEL_STRINGS, EXPENSE_MODEL_PAYMENT_STRINGS } from '../../ModelTypes/ModelTypes.js';
export function parseExpenseFormData(form) {
    var formData = new FormData(form);
    var formDataRecord = {};
    fillFormDataRecord(formDataRecord, formData);
    /* parseToNullableFloat is used to simplify the data sent to the api
        by either sending a string | number | null */
    var expenseData = {
        id: parseToNullableFloat(formDataRecord[EXPENSE_MODEL_STRINGS.id]),
        amount: parseFloat(formDataRecord[EXPENSE_MODEL_STRINGS.amount]),
        date: formDataRecord[EXPENSE_MODEL_STRINGS.date],
        expenseCategoryId: parseToNullableFloat(formDataRecord[EXPENSE_MODEL_STRINGS.expenseCategoryId]),
        description: formDataRecord[EXPENSE_MODEL_STRINGS.description],
        accountId: parseToNullableFloat(formDataRecord[EXPENSE_MODEL_PAYMENT_STRINGS.accountId]),
        creditCardId: parseToNullableFloat(formDataRecord[EXPENSE_MODEL_PAYMENT_STRINGS.creditCardId]),
        debtId: parseToNullableFloat(formDataRecord[EXPENSE_MODEL_PAYMENT_STRINGS.debtId])
    };
    return expenseData;
}
export function fetchExpenseFormDataUpdate(expenseData) {
    return expenseData;
}
function fillFormDataRecord(formDataRecord, formData) {
    for (var key in EXPENSE_MODEL_STRINGS) {
        if (!(formData.has(key))) {
            formDataRecord[key] = null;
            continue;
        }
        if (key === EXPENSE_MODEL_STRINGS.payment) {
            fillPaymentMethods(formDataRecord, formData, key);
        }
        else {
            var value = formData.get(key);
            formDataRecord[key] = value.toString();
        }
    }
}
function fillPaymentMethods(formDataRecord, formData, key) {
    var paymentMethod = formData.get(key).toString().split('-', 1).join();
    var paymentMethodId = formData.get(key).toString().split('-').slice(1, 2).join();
    for (var paymentKey in EXPENSE_MODEL_PAYMENT_STRINGS) {
        if (paymentMethod === paymentKey) {
            formDataRecord[paymentKey] = paymentMethodId;
        }
        else {
            formDataRecord[paymentKey] = null;
        }
    }
}
function parseToNullableFloat(value) {
    var parsedValue = parseFloat(value);
    if (isNaN(parsedValue))
        return null;
    else
        return parsedValue;
}
//# sourceMappingURL=RowUpdateHandler.js.map