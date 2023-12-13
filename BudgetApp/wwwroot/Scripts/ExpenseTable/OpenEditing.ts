import { setAriaHiddenTrue, setAriaHiddenFalse } from '../Utils/SetAttributeFunctions.js'

// This one stays, only the pure inline editing functionality
export function openEditing(editBtn: HTMLButtonElement) {
    if (editBtn == null || !(editBtn instanceof HTMLButtonElement)) return
    
    const row: HTMLTableRowElement = editBtn.closest('table tr')
    if (!(row instanceof HTMLTableRowElement) || row == null) return

    const tableData = row.querySelectorAll('.td')
    tableData.forEach(td => setAriaHiddenTrue(td))

    const labels = row.querySelectorAll('label')
    const inputs = row.querySelectorAll('input')
    const selects = row.querySelectorAll('select')

    labels.forEach(label => setAriaHiddenFalse(label))
    inputs.forEach(input => setAriaHiddenFalse(input))
    selects.forEach(select => setAriaHiddenFalse(select))

    setAriaHiddenTrue(editBtn)

    const detailsBtn = row.querySelector('.details-btn')
    if ((detailsBtn instanceof HTMLButtonElement) && detailsBtn != null) {
        setAriaHiddenTrue(detailsBtn)
    }

    const saveBtn = row.querySelector('.save-btn')
    if ((saveBtn instanceof HTMLButtonElement) && saveBtn != null) {
        setAriaHiddenFalse(saveBtn)
    }

    const cancelBtn = row.querySelector('.cancel-btn')
    if ((cancelBtn instanceof HTMLButtonElement) && cancelBtn != null) {
        setAriaHiddenFalse(cancelBtn)
    }


}

