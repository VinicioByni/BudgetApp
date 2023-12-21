import { ARIA_HIDDEN, TRUE, FALSE, TAB_INDEX, DATA_ACTIVE } from '../Utils/MagicStrings.js';
export function setAriaHiddenTrue(element) {
    element.setAttribute(ARIA_HIDDEN, TRUE);
}
export function setAriaHiddenFalse(element) {
    element.setAttribute(ARIA_HIDDEN, FALSE);
}
export function setTabIndexTrue(element) {
    element.setAttribute(TAB_INDEX, '0');
}
export function setTabIndexFalse(element) {
    element.setAttribute(TAB_INDEX, '-1');
}
export function setDataActiveTrue(element) {
    element.setAttribute(DATA_ACTIVE, TRUE);
}
export function setDataActiveFalse(element) {
    element.setAttribute(DATA_ACTIVE, FALSE);
}
//# sourceMappingURL=SetAttributeFunctions.js.map