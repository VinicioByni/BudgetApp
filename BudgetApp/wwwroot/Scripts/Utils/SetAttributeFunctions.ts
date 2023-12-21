import { ARIA_HIDDEN, TRUE, FALSE, TAB_INDEX, DATA_ACTIVE } from '../Utils/MagicStrings.js'

export function setAriaHiddenTrue(element: Element) {
    element.setAttribute(ARIA_HIDDEN, TRUE)
}
export function setAriaHiddenFalse(element: Element) {
    element.setAttribute(ARIA_HIDDEN, FALSE)
}


export function setTabIndexTrue(element: Element) {
    element.setAttribute(TAB_INDEX, '0')
}
export function setTabIndexFalse(element: Element) {
    element.setAttribute(TAB_INDEX, '-1')
}


export function setDataActiveTrue(element: Element) {
    element.setAttribute(DATA_ACTIVE, TRUE)
}
export function setDataActiveFalse(element: Element) {
    element.setAttribute(DATA_ACTIVE, FALSE)
}

