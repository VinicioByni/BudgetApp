import { setAriaHiddenTrue, setAriaHiddenFalse, setTabIndexFalse, setTabIndexTrue } from '../../Utils/SetAttributeFunctions.js'

export function cancelEditing(cancelBtn: HTMLButtonElement) {
    if (cancelBtn == null || !(cancelBtn instanceof HTMLButtonElement)) return

    const row: HTMLTableRowElement = cancelBtn.closest('table tr')
    if (!(row instanceof HTMLTableRowElement) || row == null) return

    const labels = row.querySelectorAll('label')
    const inputs = row.querySelectorAll('input')
    const selects = row.querySelectorAll('select')

    labels.forEach(label => setAriaHiddenTrue(label))
    inputs.forEach(input => { setAriaHiddenTrue(input); setTabIndexFalse(input) })
    selects.forEach(select => { setAriaHiddenTrue(select); setTabIndexFalse(select) })

    const tableData = row.querySelectorAll('.td')
    tableData.forEach(td => setAriaHiddenFalse(td))

    const saveBtn = row.querySelector('.save-btn')
    if ((saveBtn instanceof HTMLButtonElement) && saveBtn != null) {
        setAriaHiddenTrue(saveBtn)
        setTabIndexFalse(saveBtn)
    }

    setAriaHiddenTrue(cancelBtn)
    setTabIndexFalse(cancelBtn)

    const editBtn = row.querySelector('.edit-btn')
    if ((editBtn instanceof HTMLButtonElement) && editBtn != null) {
        setAriaHiddenFalse(editBtn)
        setTabIndexTrue(editBtn)
    }

    const detailsBtn = row.querySelector('.details-btn')
    if ((detailsBtn instanceof HTMLButtonElement) && detailsBtn != null) {
        setAriaHiddenFalse(detailsBtn)
        setTabIndexTrue(detailsBtn)
    }
    
}