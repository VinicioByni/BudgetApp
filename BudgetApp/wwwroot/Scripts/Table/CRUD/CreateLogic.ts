import { fetchCreate } from './CreateApi.js'
import { TableModelCreate } from '../TableSettingsParameters/TableModelsParameters.js'
import { safeToString } from '../../Utilities/StringUtilities.js'
import { safeParseInt, safeParseFloat } from '../../Utilities/ParseUtilities.js'

export const createRow = function (tableVariant) {

  
    // Special select list case for expense table
    if (tableVariant === "expense") {
        changeSelectListName()
    }


    const form = document.querySelector(`#${tableVariant}CreateForm`)

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        if (event.target instanceof HTMLFormElement) {
            const formData = new FormData(event.target);
            const formObjectModel: TableModelCreate = {
                Amount: safeParseFloat(safeToString(formData.get('Amount'), "0"), 0),
                Date: safeToString(formData.get('Date'), "2000-01-01"),
                CategoryId: safeParseInt(safeToString(formData.get(`CategoryId`), ""), null),
                Description: safeToString(formData.get('Description'), ""),
                AccountId: safeParseInt(safeToString(formData.get('AccountId'), ""), null),
                CreditCardId: safeParseInt(safeToString(formData.get('CreditCardId'), ""), null),
                DebtId: safeParseInt(safeToString(formData.get('DebtId'), ""), null)
            }

            fetchCreate(formObjectModel, tableVariant)
        }
    })
    
}

const changeSelectListName = function () {

    const expenseSelectList = document.querySelector(`#paymentSelectList`)
    if (expenseSelectList instanceof HTMLSelectElement) {

        expenseSelectList.addEventListener('change', function () {

            const selectIndex = this.selectedIndex
            const selectedOption = this.options[selectIndex]

            const selectedName = selectedOption.getAttribute('data-name');
            expenseSelectList.name = selectedName
        })
    }

}