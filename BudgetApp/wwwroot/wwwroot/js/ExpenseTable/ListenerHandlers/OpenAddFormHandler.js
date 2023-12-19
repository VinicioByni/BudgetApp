import { setAriaHiddenFalse } from "../../Utils/SetAttributeFunctions.js";
export function openAddForm(table) {
    var addFormRow = table.querySelector('.expense-add-row');
    if (addFormRow == null || !(addFormRow instanceof HTMLTableRowElement))
        return;
    setAriaHiddenFalse(addFormRow);
}
//# sourceMappingURL=OpenAddFormHandler.js.map