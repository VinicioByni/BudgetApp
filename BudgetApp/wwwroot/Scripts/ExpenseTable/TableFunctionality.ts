import { openEditing } from './ListenerHandlers/OpenEditingHandler.js'
import { openDetails } from './ListenerHandlers/OpenDetailsHandler.js'
import { handleExpenseRowUpdate } from './ListenerHandlers/RowUpdateHandler.js'
import { cancelEditing } from './ListenerHandlers/CancelEditingHandler.js'
import { handleExpenseRowDeletion } from './ListenerHandlers/RowDeletionHandler.js'
import { handleMasterCheckbox, handleRowsCheckbox, updateDeleteBtnAvailability } from './ListenerHandlers/CheckboxHandler.js'
import { handleExpenseAddRow } from './ListenerHandlers/RowAddHandler.js'
import { openAddForm } from './ListenerHandlers/OpenAddFormHandler.js'
import { closeAddForm } from './ListenerHandlers/CloseAddFormHandler.js'


loadExpenseTable()
async function loadExpenseTable() {
    const partialViewContainer = document.querySelector('#ExpensePartialViewContainer')
    if (partialViewContainer == null) return Error('Expense partial view container not found')

    const url = 'Expense/_ExpenseTablePartial'
    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
        
    })
    if (response.ok) {
        const partialView = await response.text()
        partialViewContainer.innerHTML = partialView
        expenseTableFunctionality()
    }
}

export function expenseTableFunctionality() {

    const table = document.querySelector('.expense-table')
    if (!(table instanceof HTMLTableElement) || table == null) return

    setUpListeners(table)
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


