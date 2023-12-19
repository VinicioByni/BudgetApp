import { setAriaHiddenTrue } from "../../Utils/SetAttributeFunctions.js"

export function closeAddForm(table: HTMLTableElement) {
    const addFormRow = table.querySelector('.expense-add-row')
    console.log(addFormRow)
    if (addFormRow == null || !(addFormRow instanceof HTMLTableRowElement)) return

    setAriaHiddenTrue(addFormRow)
}