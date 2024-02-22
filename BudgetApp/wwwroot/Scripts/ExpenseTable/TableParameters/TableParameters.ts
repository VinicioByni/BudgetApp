import { setDataActiveTrue } from "../../Utils/SetAttributeFunctions.js";
import { enableClearBtnState } from "../ListenerHandlers/ClearTableParametersHandler.js";
import { type TableParameters } from "../Models/TableParametersType.js";

export let tableParameters: TableParameters = {}
export function initializeTableParameters() {
    tableParameters = {
        periodInitialDate: '',
        searchString: '',
        searchDate: '',
        sortOrder: '',
        sortOption: '',
        pageNumber: 1,
        pageSize: 5
    }
}

export function getTableParameters(): TableParameters {
    return tableParameters
}

export function getUrlTableParameters(): string {
    var urlTableParameters = `pageNumber=${tableParameters.pageNumber}`
    urlTableParameters += `&pageSize=${tableParameters.pageSize}`
    urlTableParameters += `&periodInitialDate=${tableParameters.periodInitialDate}`
    urlTableParameters += `&searchDate=${tableParameters.searchDate}`
    urlTableParameters += `&searchString=${tableParameters.searchString}`
    urlTableParameters += `&sortOption=${tableParameters.sortOption}`
    urlTableParameters += `&sortOrder=${tableParameters.sortOrder}`

    return urlTableParameters
}

export function updateTableParametersState() {
    
    if (tableParameters.searchString !== '') {
        updateSearchStringState()
        enableClearBtnState()
    }

    if (tableParameters.searchDate !== '') {
        updateSearchDateState()
        enableClearBtnState()
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

export function setPageNumber(pageNumber: number) {
    tableParameters.pageNumber = pageNumber
}

export function setSortOption(sortOption: string) {
    tableParameters.sortOption= sortOption
}
export function setSortOrder(sortOrder: string) {
    tableParameters.sortOrder = sortOrder
}


