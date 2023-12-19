import { setAriaHiddenTrue } from "../../Utils/SetAttributeFunctions.js";
export function closeAddForm(table) {
    var addFormRow = table.querySelector('.expense-add-row');
    console.log(addFormRow);
    if (addFormRow == null || !(addFormRow instanceof HTMLTableRowElement))
        return;
    setAriaHiddenTrue(addFormRow);
}
//# sourceMappingURL=CloseAddFormHandler.js.map