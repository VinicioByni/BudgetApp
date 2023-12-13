import { setAriaHiddenTrue, setAriaHiddenFalse } from '../Utils/SetAttributeFunctions.js';
// This one stays, only the pure inline editing functionality
export function inlineEditing(editBtn) {
    if (editBtn == null || !(editBtn instanceof HTMLButtonElement))
        return;
    var row = editBtn.closest('table tr');
    if (!(row instanceof HTMLTableRowElement) || row == null)
        return;
    var labels = row.querySelectorAll('label');
    var inputs = row.querySelectorAll('input');
    var selects = row.querySelectorAll('select');
    labels.forEach(function (label) { return setAriaHiddenFalse(label); });
    inputs.forEach(function (input) { return setAriaHiddenFalse(input); });
    selects.forEach(function (select) { return setAriaHiddenFalse(select); });
    var saveBtn = row.querySelector('.save-btn');
    if ((saveBtn instanceof HTMLButtonElement) && saveBtn != null) {
        setAriaHiddenFalse(saveBtn);
    }
    var cancelBtn = row.querySelector('.cancel-btn');
    if ((cancelBtn instanceof HTMLButtonElement) && cancelBtn != null) {
        setAriaHiddenFalse(cancelBtn);
    }
    var detailsBtn = row.querySelector('.details-btn');
    if ((detailsBtn instanceof HTMLButtonElement) && detailsBtn != null) {
        setAriaHiddenTrue(detailsBtn);
    }
    setAriaHiddenTrue(editBtn);
}
//# sourceMappingURL=InlineEditing.js.map