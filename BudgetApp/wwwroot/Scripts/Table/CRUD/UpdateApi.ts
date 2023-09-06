import { getTableApiUrls } from '../CRUD/TableApiUrls.js'
import { fetchRead } from '../CRUD/ReadApi.js'
import { TableModelUpdate } from '../TableSettingsParameters/TableModelsParameters.js'

export const fetchUpdate = function (model: TableModelUpdate, tableVariant) {
    
    const tableApiUrls = getTableApiUrls(tableVariant)
    const tableVariantModelParametersUrl = modelParametersToUrl(model, tableVariant)
    
    fetch(tableApiUrls.Update + tableVariantModelParametersUrl, {
    method: "POST"
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Update table fetch network error')
            }
            return response.text()
        })
        .then(text => {
        })
        .catch(error => {
            console.error('Update fetch table error', error)
        })
        .finally(() => {
            fetchRead(tableVariant)
        })
}

function modelParametersToUrl(model: TableModelUpdate, tableVariant):string {
    if (tableVariant === "income") {
        return `Id=${model.Id}&Amount=${model.Amount}&Date=${model.Date}&Description=${model.Description}&IncomeCategoryId=${model.CategoryId}&AccountId=${model.AccountId}`

    }
    else {


        return `Id=${model.Id}&Amount=${model.Amount}&Date=${model.Date}&Description=${model.Description}&ExpenseCategoryId=${model.CategoryId}&AccountId=${model.AccountId}&CreditCardId=${model.CreditCardId}&DebtId=${model.DebtId}`
    }
}