import { fetchUpdate } from './UpdateApi.js'
import { TableModelUpdate} from '../TableSettingsParameters/TableModelsParameters.js'
import { safeToString } from '../../Utilities/StringUtilities.js'
import { safeParseInt, safeParseFloat } from '../../Utilities/ParseUtilities.js'

export const updateRow = function (tableVariant) {

    const editBtns = document.querySelectorAll(`.${tableVariant}-edit-btn`)

    editBtns.forEach(editBtn => {
        editBtn.addEventListener('click', function () {
            const row = this.closest("tr")
            const rowId = row.dataset.id

            showEditMode(tableVariant, row, editBtn)

            const cancelBtn = row.querySelector(`.${tableVariant}-cancel-btn`)
            cancelBtn.addEventListener('click', () => hideEditMode(tableVariant, row))

            // Special select list case for expense table
            if (tableVariant === "expense") {
                changeSelectListName(rowId)
            }

            const form = document.querySelector(`#${tableVariant}Form-${rowId}`)

            form.addEventListener('submit', function (event) {
                event.preventDefault();
                if (event.target instanceof HTMLFormElement) {
                    const formData = new FormData(event.target);

                    const formObjectModel: TableModelUpdate = {
                        Id: rowId,
                        Amount: safeParseFloat(safeToString(formData.get('Amount'), "0"), 0),
                        Date: safeToString(formData.get('Date'), "2000-01-01"),
                        CategoryId: safeParseInt(safeToString(formData.get(`CategoryId`), ""), null),
                        Description: safeToString(formData.get('Description'), ""),
                        AccountId: safeParseInt(safeToString(formData.get('AccountId'), ""), null),
                        CreditCardId: safeParseInt(safeToString(formData.get('CreditCardId'), ""), null),
                        DebtId: safeParseInt(safeToString(formData.get('DebtId'), ""), null)
                    }

                    fetchUpdate(formObjectModel, tableVariant)
                }
            })
        })
    })
}

const changeSelectListName = function (rowId) {
    
    const expenseSelectList = document.querySelector(`#paymentSelectList-${rowId}`)
    if (expenseSelectList instanceof HTMLSelectElement) {

        expenseSelectList.addEventListener('change', function () {

            const selectIndex = this.selectedIndex
            const selectedOption = this.options[selectIndex]

            const selectedName = selectedOption.getAttribute('data-name');
            expenseSelectList.name = selectedName
        })
    }
  
}


function showEditMode(tableVariant, row, editBtn) {
    
    const spans = row.querySelectorAll('span')
    const inputs = row.querySelectorAll('input')
    const selects = row.querySelectorAll('select')

    spans.forEach(span => {
        span.style.display = "none"
    })

    inputs.forEach(input => {
        input.style.display = "block"
    });

    selects.forEach(select => {
        select.style.display = "block"
    })


    const deleteBtn = row.querySelector(`.${tableVariant}-delete-btn`)
    const cancelBtn = row.querySelector(`.${tableVariant}-cancel-btn`)
    const updateBtn = row.querySelector(`.${tableVariant}-update-btn`);

    if (editBtn instanceof HTMLButtonElement) {
        editBtn.style.display = "none";
    }
    if (deleteBtn instanceof HTMLButtonElement) {
        deleteBtn.style.display = "none";
    }
    if (cancelBtn instanceof HTMLButtonElement) {
        cancelBtn.style.display = "block";
    }
    if (updateBtn instanceof HTMLButtonElement) {
        updateBtn.style.display = "block";
    }
}

function hideEditMode(tableVariant, row) {
    const spans = row.querySelectorAll('span')
    const inputs = row.querySelectorAll('input')
    const selects = row.querySelectorAll('select')

    spans.forEach(span => {
        span.style.display = "block"
    })

    inputs.forEach(input => {
        input.style.display = "none"
    });

    selects.forEach(select => {
        select.style.display = "none"
    })

    const editBtn = row.querySelector(`.${tableVariant}-edit-btn`)
    const deleteBtn = row.querySelector(`.${tableVariant}-delete-btn`)
    const cancelBtn = row.querySelector(`.${tableVariant}-cancel-btn`)
    const updateBtn = row.querySelector(`.${tableVariant}-update-btn`);

    if (editBtn instanceof HTMLButtonElement) {
        editBtn.style.display = "block";
    }
    if (deleteBtn instanceof HTMLButtonElement) {
        deleteBtn.style.display = "block";
    }
    if (cancelBtn instanceof HTMLButtonElement) {
        cancelBtn.style.display = "none";
    }
    if (updateBtn instanceof HTMLButtonElement) {
        updateBtn.style.display = "none";
    }
}



    







