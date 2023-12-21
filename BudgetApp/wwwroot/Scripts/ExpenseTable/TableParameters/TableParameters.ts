import { setDataActiveTrue } from "../../Utils/SetAttributeFunctions.js";
import { type TableParameters } from "../Models/TableParametersType.js";

export let tableParameters: TableParameters = {}
export function initializeTableParameters() {
    tableParameters = {
        periodInitialDate: '',
        searchString: '',
        searchDate: '',
        sort: '',
        pageNumber: 1,
        pageSize: 0
    }
}

export function getTableParameters(): TableParameters {
    return tableParameters
}

export function updateTableParametersState() {
    
    if (tableParameters.searchString !== '') {
        updateSearchStringState()
    }

    if (tableParameters.searchDate !== '') {
        updateSearchDateState()
    }
}

function updateSearchStringState() {
    const expenseSearchInput = document.querySelector('#expense-search-input')
    if (expenseSearchInput == null || !(expenseSearchInput instanceof HTMLInputElement)) return

    expenseSearchInput.value = tableParameters.searchString
    setDataActiveTrue(expenseSearchInput)
}

function updateSearchDateState() {
    const expenseSearchDateInput = document.querySelector('#expense-search-date-input')
    if (expenseSearchDateInput == null || !(expenseSearchDateInput instanceof HTMLInputElement)) return

    expenseSearchDateInput.value = tableParameters.searchDate
    setDataActiveTrue(expenseSearchDateInput)
}


