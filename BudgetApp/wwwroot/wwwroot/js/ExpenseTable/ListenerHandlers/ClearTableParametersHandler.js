import { setDisabledFalse } from "../../Utils/SetAttributeFunctions.js";
export function enableClearBtnState() {
    var expenseTableSection = document.querySelector('section.expense-table-section');
    if (expenseTableSection == null || !(expenseTableSection instanceof HTMLElement))
        return;
    var clearBtn = expenseTableSection.querySelector('.clear-table-parameters-btn');
    if (clearBtn == null || !(clearBtn instanceof HTMLButtonElement))
        return;
    console.log(clearBtn);
    setDisabledFalse(clearBtn);
}
//# sourceMappingURL=ClearTableParametersHandler.js.map