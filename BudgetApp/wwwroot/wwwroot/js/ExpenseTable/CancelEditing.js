import { setAriaHiddenTrue, setAriaHiddenFalse } from '../Utils/SetAttributeFunctions.js';
export function cancelEditing(cancelBtn) {
    if (cancelBtn == null || !(cancelBtn instanceof HTMLButtonElement))
        return;
    var row = cancelBtn.closest('table tr');
    if (!(row instanceof HTMLTableRowElement) || row == null)
        return;
    var labels = row.querySelectorAll('label');
    var inputs = row.querySelectorAll('input');
    var selects = row.querySelectorAll('select');
    labels.forEach(function (label) { return setAriaHiddenTrue(label); });
    inputs.forEach(function (input) { return setAriaHiddenTrue(input); });
    selects.forEach(function (select) { return setAriaHiddenTrue(select); });
    var tableData = row.querySelectorAll('.td');
    tableData.forEach(function (td) { return setAriaHiddenFalse(td); });
    var saveBtn = row.querySelector('.save-btn');
    if ((saveBtn instanceof HTMLButtonElement) && saveBtn != null) {
        setAriaHiddenTrue(saveBtn);
    }
    setAriaHiddenTrue(cancelBtn);
    var editBtn = row.querySelector('.edit-btn');
    if ((editBtn instanceof HTMLButtonElement) && editBtn != null) {
        setAriaHiddenFalse(editBtn);
    }
    var detailsBtn = row.querySelector('.details-btn');
    if ((detailsBtn instanceof HTMLButtonElement) && detailsBtn != null) {
        setAriaHiddenFalse(detailsBtn);
    }
}
//# sourceMappingURL=CancelEditing.js.map