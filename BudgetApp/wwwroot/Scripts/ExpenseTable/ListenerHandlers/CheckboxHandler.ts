let rowsCheckboxCounter = 0;
export function handleMasterCheckbox(masterCheckbox: HTMLInputElement, rowsCheckbox: NodeListOf<Element>) {
    if (masterCheckbox.checked) {
        rowsCheckbox.forEach(checkbox => {
            if (checkbox == null || !(checkbox instanceof HTMLInputElement)) return
            checkbox.checked = true
        })

        rowsCheckboxCounter = rowsCheckbox.length
        updateDeleteBtnAvailability()
    }
    else {
        rowsCheckbox.forEach(checkbox => {
            if (checkbox == null || !(checkbox instanceof HTMLInputElement)) return
            checkbox.checked = false
            substractCheckboxCount()
        })

        rowsCheckboxCounter = 0
        updateDeleteBtnAvailability()
    }
}

export function handleRowsCheckbox(masterCheckbox: HTMLInputElement, rowsCheckbox: NodeListOf<Element>, checkbox: HTMLInputElement) {
    let isChecked = checkbox.checked

    if (isChecked) addCheckboxCount(rowsCheckbox.length)
    else substractCheckboxCount()

    if (rowsCheckboxCounter === 0) masterCheckbox.checked = false
}

export function updateDeleteBtnAvailability() {
    const deleteBtn = document.querySelector('.expense-table-section .search-bar-container .delete-btn')
    if (deleteBtn == null || !(deleteBtn instanceof HTMLButtonElement)) return

    if (rowsCheckboxCounter > 0) deleteBtn.disabled = false
    else deleteBtn.disabled = true
}

function addCheckboxCount(totalCheckboxes: number) {
    if (rowsCheckboxCounter != totalCheckboxes) {
        rowsCheckboxCounter++

    }
    updateDeleteBtnAvailability()
}
function substractCheckboxCount() {
    if (rowsCheckboxCounter != 0) {
        rowsCheckboxCounter--
    }

    updateDeleteBtnAvailability()
}