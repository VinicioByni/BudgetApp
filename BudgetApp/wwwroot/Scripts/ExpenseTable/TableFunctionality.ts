import { openEditing } from './TableFunctionalityFiles/OpenInlineEditing.js'
import { openDetails } from '../ExpenseTable/TableFunctionalityFiles/OpenRowDetails.js'
import { handleRowUpdateRequest } from '../ExpenseTable/TableFunctionalityFiles/HandleRowUpdate.js'
import { cancelEditing } from '../ExpenseTable/TableFunctionalityFiles/CancelInlineEditing.js'
import { handleRowDeletionRequest } from '../ExpenseTable/TableFunctionalityFiles/HandleRowDeletion.js'
import { handleMasterCheckbox, handleRowsCheckbox, updateDeleteBtnAvailability } from '../ExpenseTable/TableFunctionalityFiles/CheckboxHandler.js'

inlineEditingListener()


function inlineEditingListener() {

    const table = document.querySelector('.expense-table')
    if (!(table instanceof HTMLTableElement) || table == null) return

    setUpOpenEditingListener(table)

    setUpOpenDetailsListener(table)

    setUpSaveEditingListener(table)

    setUpCancelEditingListener(table)

    setUpDeleteFormListener(table)

    setUpCheckboxListener(table)

    updateDeleteBtnAvailability()
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
function setUpOpenDetailsListener(table: HTMLTableElement) {
    const detailsBtns = table.querySelectorAll('.details-btn')
    detailsBtns.forEach(detailBtn => {
        if (detailBtn == null || !(detailBtn instanceof HTMLButtonElement)) return

        detailBtn.addEventListener('click', () => {
            openDetails(detailBtn)
        })
    })
}
function setUpSaveEditingListener(table: HTMLTableElement) {
    const saveBtns = table.querySelectorAll('.save-btn')
    saveBtns.forEach(saveBtn => {
        if (saveBtn == null || !(saveBtn instanceof HTMLButtonElement)) return

        saveBtn.addEventListener('click', () => {
            handleRowUpdateRequest(saveBtn)
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

function setUpDeleteFormListener(table: HTMLTableElement) {
    const deleteForm = table.querySelector('#expense-delete-form')
    if (deleteForm == null || !(deleteForm instanceof HTMLFormElement)) return

    deleteForm.addEventListener('submit', (e) => {
        e.preventDefault()
        const form = e.target
        if (!(form instanceof HTMLFormElement)) return
        handleRowDeletionRequest(form)  
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


