import { openDetails, closeDetails } from './ListenerHandlers/RowDetailsHandler.js'
import { handleExpenseRowUpdate, openEditing, cancelEditing } from './ListenerHandlers/RowUpdateHandler.js'
import { handleExpenseRowDeletion } from './ListenerHandlers/RowDeletionHandler.js'
import { handleMasterCheckbox, handleRowsCheckbox, resetCheckboxCounter, updateDeleteBtnAvailability } from './ListenerHandlers/CheckboxHandler.js'
import { handleExpenseAddRow, closeAddForm, openAddForm } from './ListenerHandlers/RowAddHandler.js'
import { getTableParameters, initializeTableParameters, updateTableParametersState } from './TableParameters/TableParameters.js'
import { getExpenseTable } from './ListenerHandlers/GetTableHandler.js'
import { TableParameters } from './Models/TableParametersType.js'

initializeTableParameters()
getExpenseTable()

export function expenseTableFunctionality() {

    const table = document.querySelector('.expense-table')
    if (!(table instanceof HTMLTableElement) || table == null) return

    setUpListeners(table)
    updateTableParametersState()
}

function setUpListeners(table: HTMLTableElement) {
    setUpOpenEditingListener(table)
    setUpSaveEditingListener(table)
    setUpCancelEditingListener(table)

    setUpOpenDetailsListener(table)

    setUpDeleteFormListener(table)
    setUpCheckboxListener(table)
    updateDeleteBtnAvailability()

    setUpOpenAddFormBtnListener(table)
    setUpCancelAddFormBtnListener(table)
    setUpAddRowFormListener(table)

    setUpSearchFormListener(table)
}

function setUpOpenEditingListener(table: HTMLTableElement) {
    const editBtns = table.querySelectorAll('.edit-btn')
    editBtns.forEach(editBtn => {
        if (editBtn == null || !(editBtn instanceof HTMLButtonElement)) return

        editBtn.addEventListener('click', () => {
            openEditing(editBtn)
        })
    })
}
function setUpSaveEditingListener(table: HTMLTableElement) {
    const saveBtns = table.querySelectorAll('.save-btn')
    saveBtns.forEach(saveBtn => {
        if (saveBtn == null || !(saveBtn instanceof HTMLButtonElement)) return
        const row = saveBtn.closest('tr')
        const editForm = row.querySelector('.edit-form')

        if (editForm == null || !(editForm instanceof HTMLFormElement)) return
        editForm.addEventListener('submit', (e) => {
            e.preventDefault()
            const form = e.target
            if (!(form instanceof HTMLFormElement)) return
            handleExpenseRowUpdate(form)
        })
    })
}
function setUpCancelEditingListener(table: HTMLTableElement) {
    const cancelBtns = table.querySelectorAll('.cancel-btn')
    cancelBtns.forEach(cancelBtn => {
        if (cancelBtn == null || !(cancelBtn instanceof HTMLButtonElement)) return

        cancelBtn.addEventListener('click', () => {
            cancelEditing(cancelBtn)
        })
    })
}



function setUpOpenDetailsListener(table: HTMLTableElement) {
    const detailsBtns = table.querySelectorAll('.details-btn')
    detailsBtns.forEach(detailBtn => {
        if (detailBtn == null || !(detailBtn instanceof HTMLButtonElement)) return

        detailBtn.addEventListener('click', () => {
            openDetails(detailBtn)
        })
    })
}
/*
function setUpCloseDetailsListener(table: HTMLTableElement) {
    const closeDetailsBtns = table.querySelectorAll('.details-btn')
    closeDetailsBtns.forEach(detailBtn => {
        if (detailBtn == null || !(detailBtn instanceof HTMLButtonElement)) return

        detailBtn.addEventListener('click', () => {
            closeDetails(detailBtn)
        })
    })
}
*/



function setUpOpenAddFormBtnListener(table: HTMLTableElement) {
    const expenseTableSection = table.closest("section.expense-table-section")
    if (expenseTableSection == null) return

    const openAddFormBtn = expenseTableSection.querySelector('.table-actions-btns-container .add-btn')
    if (openAddFormBtn == null || !(openAddFormBtn instanceof HTMLButtonElement)) return
    
    openAddFormBtn.addEventListener('click', () => {
        openAddForm(table)
    })
}

function setUpCancelAddFormBtnListener(table: HTMLTableElement) {
    const cancelAddFormBtn = table.querySelector('.expense-add-row .cancel-btn')
    if (cancelAddFormBtn == null || !(cancelAddFormBtn instanceof HTMLButtonElement)) return

    cancelAddFormBtn.addEventListener('click', () => {
        closeAddForm(table)
    })
}

function setUpAddRowFormListener(table: HTMLTableElement) {
    const addForm = table.querySelector('#expense-add-form')
    if (addForm == null || !(addForm instanceof HTMLFormElement)) return

    addForm.addEventListener('submit', (e) => {
        e.preventDefault()
        const form = e.target
        if (!(form instanceof HTMLFormElement)) return
        handleExpenseAddRow(form)
    })
}



function setUpDeleteFormListener(table: HTMLTableElement) {
    const deleteForm = table.querySelector('#expense-delete-form')
    if (deleteForm == null || !(deleteForm instanceof HTMLFormElement)) return

    deleteForm.addEventListener('submit', (e) => {
        e.preventDefault()
        const form = e.target
        if (!(form instanceof HTMLFormElement)) return
        handleExpenseRowDeletion(form)  
        resetCheckboxCounter()
    })
}



function setUpCheckboxListener(table: HTMLTableElement) {
    const masterCheckbox = table.querySelector('#expense-master-checkbox')
    if (masterCheckbox == null || !(masterCheckbox instanceof HTMLInputElement)) return

    const rowsCheckbox = table.querySelectorAll('.row-checkbox')

    masterCheckbox.addEventListener('click', () => {
        handleMasterCheckbox(masterCheckbox, rowsCheckbox)
    })

    rowsCheckbox.forEach(checkbox => {
        if (checkbox == null || !(checkbox instanceof HTMLInputElement)) return

        checkbox.addEventListener('click', () => {
            handleRowsCheckbox(masterCheckbox, rowsCheckbox, checkbox)  
        })
    })
}



function setUpSearchFormListener(table: HTMLTableElement) {
    const searchForm = table.querySelector('#expense-search-form')
    if (searchForm == null || !(searchForm instanceof HTMLFormElement)) return

    searchForm.addEventListener('submit', (e) => {
        e.preventDefault()
        const form = e.target
        if (!(form instanceof HTMLFormElement)) return
        // Make file for the search form handler
        const formData = new FormData(form)

        const tableParameters: TableParameters = getTableParameters()

        const formDataMap = getFormDataMap(formData)

        const urlTableParameters = new URLSearchParams()
        /*  1 Have map of parameters and form data 
            2 Update table parameters map with form data map data 
            3 Use this to make url search params with append() and then transform it into a string url
            */
        function getFormDataMap(formData: FormData): Record<string, any> {
            const map = new Map()
            formData.forEach((value, key) => {
                if (typeof key === 'string') {
                    map.set(key, value)
                }
            })
            return map
        }
        for (const key in tableParameters) {
            if (formDataMap.has(key)) {
                const formDataValue = formDataMap.get(key)
                tableParameters[key] = formDataValue
            }
            urlTableParameters.append(key, tableParameters[key])
        }
 
        getExpenseTable(urlTableParameters.toString())
    })

}


