import { setAriaHiddenTrue, setAriaHiddenFalse, setTabIndexFalse, setTabIndexTrue } from '../Utils/SetAttributeFunctions.js';
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
    inputs.forEach(function (input) { setAriaHiddenTrue(input); setTabIndexFalse(input); });
    selects.forEach(function (select) { setAriaHiddenTrue(select); setTabIndexFalse(select); });
    var tableData = row.querySelectorAll('.td');
    tableData.forEach(function (td) { return setAriaHiddenFalse(td); });
    var saveBtn = row.querySelector('.save-btn');
    if ((saveBtn instanceof HTMLButtonElement) && saveBtn != null) {
        setAriaHiddenTrue(saveBtn);
        setTabIndexFalse(saveBtn);
    }
    setAriaHiddenTrue(cancelBtn);
    setTabIndexFalse(cancelBtn);
    var editBtn = row.querySelector('.edit-btn');
    if ((editBtn instanceof HTMLButtonElement) && editBtn != null) {
        setAriaHiddenFalse(editBtn);
        setTabIndexTrue(editBtn);
    }
    var detailsBtn = row.querySelector('.details-btn');
    if ((detailsBtn instanceof HTMLButtonElement) && detailsBtn != null) {
        setAriaHiddenFalse(detailsBtn);
        setTabIndexTrue(detailsBtn);
    }
}
//# sourceMappingURL=CancelEditing.js.map