import { getTableApiUrls } from '../CRUD/TableApiUrls.js'
import { fetchRead } from '../CRUD/ReadApi.js'
import { TableModelCreate } from '../TableSettingsParameters/TableModelsParameters.js'

export const fetchCreate = function (model: TableModelCreate, tableVariant) {

    const tableApiUrls = getTableApiUrls(tableVariant)
    const tableVariantModelParametersUrl = modelParametersToUrl(model, tableVariant)

    fetch(tableApiUrls.Create + tableVariantModelParametersUrl, {
        method: "POST"
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Create table row fetch error')
            }
            return response.text()
        })
        .then(text => {
        })
        .catch(error => {
            console.error('Create table row fetch error', error)
        })
        .finally(() => {
            fetchRead(tableVariant)
        })
}

function modelParametersToUrl(model: TableModelCreate, tableVariant): string {
    if (tableVariant === "income") {
        return `Amount=${model.Amount}&Date=${model.Date}&Description=${model.Description}&IncomeCategoryId=${model.CategoryId}&AccountId=${model.AccountId}`
    }
    else {
        return `Amount=${model.Amount}&Date=${model.Date}&Description=${model.Description}&ExpenseCategoryId=${model.CategoryId}&AccountId=${model.AccountId}&CreditCardId=${model.CreditCardId}&DebtId=${model.DebtId}`
    }
}