import { openEditing } from '../ExpenseTable/OpenEditing.js'
import { openDetails } from '../ExpenseTable/OpenRowDetails.js'
import { saveEditing} from '../ExpenseTable/SaveInlineEditing.js'
import { cancelEditing } from '../ExpenseTable/CancelInlineEditing.js'
import { deleteRow } from '../ExpenseTable/DeleteRow.js'
import { CHECKBOX_CHECKED } from '../Utils/MagicStrings.js'

inlineEditingListener()
function inlineEditingListener() {
    const table = document.querySelector('.expense-table')
    if (!(table instanceof HTMLTableElement) || table == null) return

    setUpOpenEditingListener(table)

    setUpOpenDetailsListener(table)

    setUpSaveEditingListener(table)

    setUpCancelEditingListener(table)

    setUpDeleteRowListener(table)

    setUpMasterCheckboxListener(table)
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
            saveEditing(saveBtn)
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

function setUpDeleteRowListener(table: HTMLTableElement) {
    const deleteForm = table.querySelector('#expense-delete-form')
    if (deleteForm == null || !(deleteForm instanceof HTMLFormElement)) return

    deleteForm.addEventListener('submit', (e) => {
        /* ** Move logic to delete row file later */
        e.preventDefault()

     
        if (!(e.target instanceof HTMLFormElement)) return
        const formData = new FormData(e.target)

        formData.forEach(function (value, key) {
            console.log(key + ": " + value);
        });
    })



    

}

function setUpMasterCheckboxListener(table: HTMLTableElement) {
    const masterCheckbox = table.querySelector('#expense-master-checkbox')
    if (masterCheckbox == null || !(masterCheckbox instanceof HTMLInputElement)) return

    const rowsCheckbox = table.querySelectorAll('.row-checkbox')

    masterCheckbox.addEventListener('click', () => {
        /* ** Move logic to a different file later */
        if (masterCheckbox.checked) {
            rowsCheckbox.forEach(checkbox => {
                if (checkbox == null || !(checkbox instanceof HTMLInputElement)) return
                checkbox.checked = true
            })
        }
        else {
            rowsCheckbox.forEach(checkbox => {
                if (checkbox == null || !(checkbox instanceof HTMLInputElement)) return
                checkbox.checked = false
            })
        }
    })
}
