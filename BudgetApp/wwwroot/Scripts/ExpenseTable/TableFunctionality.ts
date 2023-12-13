import { openEditing } from '../ExpenseTable/OpenEditing.js'
import { openDetails } from '../ExpenseTable/OpenDetails.js'
import { saveEditing} from '../ExpenseTable/SaveEditing.js'
import { cancelEditing } from '../ExpenseTable/CancelEditing.js'


inlineEditingListener()
function inlineEditingListener() {
    const table = document.querySelector('.expense-table')
    if (!(table instanceof HTMLTableElement) || table == null) return

    setUpOpenEditingListener(table)

    setUpOpenDetailsListener(table)

    setUpSaveEditingListener(table)

    setUpCancelEditingListener(table)
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
