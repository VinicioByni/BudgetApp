import { setDisabledFalse } from "../../Utils/SetAttributeFunctions.js";

export function enableClearBtnState() {
    const expenseTableSection = document.querySelector('section.expense-table-section')
    if (expenseTableSection == null || !(expenseTableSection instanceof HTMLElement)) return

    const clearBtn = expenseTableSection.querySelector('.clear-table-parameters-btn')
    if (clearBtn == null || !(clearBtn instanceof HTMLButtonElement)) return
    console.log(clearBtn)
    setDisabledFalse(clearBtn)
}