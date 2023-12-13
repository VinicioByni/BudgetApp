import { ARIA_HIDDEN, TRUE, FALSE } from '../Utils/MagicStrings.js'
export function setAriaHiddenTrue(element: Element) {
    element.setAttribute(ARIA_HIDDEN, TRUE)
}
export function setAriaHiddenFalse(element: Element) {
    element.setAttribute(ARIA_HIDDEN, FALSE)
}