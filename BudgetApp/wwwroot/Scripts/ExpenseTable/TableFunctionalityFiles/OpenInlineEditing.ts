import { setAriaHiddenTrue, setAriaHiddenFalse, setTabIndexTrue, setTabIndexFalse } from '../../Utils/SetAttributeFunctions.js'

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
    inputs.forEach(input => { setAriaHiddenFalse(input); setTabIndexTrue(input) })
    selects.forEach(select => { setAriaHiddenFalse(select); setTabIndexTrue(select) })

    setAriaHiddenTrue(editBtn)
    setTabIndexFalse(editBtn)

    const detailsBtn = row.querySelector('.details-btn')
    if ((detailsBtn instanceof HTMLButtonElement) && detailsBtn != null) {
        setAriaHiddenTrue(detailsBtn)
        setTabIndexFalse(detailsBtn)
    }

    const saveBtn = row.querySelector('.save-btn')
    if ((saveBtn instanceof HTMLButtonElement) && saveBtn != null) {
        setAriaHiddenFalse(saveBtn)
        setTabIndexTrue(saveBtn)
    }

    const cancelBtn = row.querySelector('.cancel-btn')
    if ((cancelBtn instanceof HTMLButtonElement) && cancelBtn != null) {
        setAriaHiddenFalse(cancelBtn)
        setTabIndexTrue(cancelBtn)
    }
}

