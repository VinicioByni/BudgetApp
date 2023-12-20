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


