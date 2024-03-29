import { setAriaHiddenTrue, setAriaHiddenFalse, setTabIndexTrue, setTabIndexFalse } from '../Utils/SetAttributeFunctions.js';
export function openEditing(editBtn) {
    if (editBtn == null || !(editBtn instanceof HTMLButtonElement))
        return;
    var row = editBtn.closest('table tr');
    if (!(row instanceof HTMLTableRowElement) || row == null)
        return;
    var tableData = row.querySelectorAll('.td');
    tableData.forEach(function (td) { return setAriaHiddenTrue(td); });
    var labels = row.querySelectorAll('label');
    var inputs = row.querySelectorAll('input');
    var selects = row.querySelectorAll('select');
    labels.forEach(function (label) { return setAriaHiddenFalse(label); });
    inputs.forEach(function (input) { setAriaHiddenFalse(input); setTabIndexTrue(input); });
    selects.forEach(function (select) { setAriaHiddenFalse(select); setTabIndexTrue(select); });
    setAriaHiddenTrue(editBtn);
    setTabIndexFalse(editBtn);
    var detailsBtn = row.querySelector('.details-btn');
    if ((detailsBtn instanceof HTMLButtonElement) && detailsBtn != null) {
        setAriaHiddenTrue(detailsBtn);
        setTabIndexFalse(detailsBtn);
    }
    var saveBtn = row.querySelector('.save-btn');
    if ((saveBtn instanceof HTMLButtonElement) && saveBtn != null) {
        setAriaHiddenFalse(saveBtn);
        setTabIndexTrue(saveBtn);
    }
    var cancelBtn = row.querySelector('.cancel-btn');
    if ((cancelBtn instanceof HTMLButtonElement) && cancelBtn != null) {
        setAriaHiddenFalse(cancelBtn);
        setTabIndexTrue(cancelBtn);
    }
}
//# sourceMappingURL=OpenEditing.js.map