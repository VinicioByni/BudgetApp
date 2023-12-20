// import { tableVariant } from './'
/*import { TableSettingsParameters } from './TableSettingsParameters.js'
import { isLocalStorageAvailable } from '../../Utilities/LocalStorageUtilities.js'

let fallBackStorage: Record<string, string> = {}

export const areTableSettingsParametersSet = function (tableVariant: string) {
    let tableSettingsParametersString:string
    if (isLocalStorageAvailable) {
        tableSettingsParametersString = localStorage.getItem(`${tableVariant}TableSettingsParameters`)
    }
    else {
        tableSettingsParametersString = fallBackStorage[`${tableVariant}TableSettingsParameters`]
    }
    
    if (tableSettingsParametersString === null || tableSettingsParametersString === undefined) {
        return false
    }

    const tableSettingsParameters: TableSettingsParameters = JSON.parse(tableSettingsParametersString || '{}')

    const pageNumber = tableSettingsParameters.pagingParameters.pageNumber
    if (isValidPageNumber(pageNumber)) {
        return true
    }
    else if (isLocalStorageAvailable) {
        localStorage.setItem(`${tableVariant}TableSettingsParameters`, null)

        return false
    }
    else {
        fallBackStorage[`${tableVariant}TableSettingsParameters`] = null

        return false
    }
    
}

function isValidPageNumber(number) {
    if (number < 1) {
        return false
    }
    return true
}


export const setTableSettingsParameters = function (tableVariant: string, tableSettingsParameters: TableSettingsParameters) {
    const tableSettingsParametersString = JSON.stringify(tableSettingsParameters)

    if (isLocalStorageAvailable()) {
        localStorage.setItem(`${tableVariant}TableSettingsParameters`, tableSettingsParametersString)
    }
    else {
        fallBackStorage[`${tableVariant}TableSettingsParameters`] = tableSettingsParametersString
    }

}


export const getTableSettingsParameters = function (tableVariant:string):TableSettingsParameters {

    if (isLocalStorageAvailable()) {
        const tableSettingsParametersString = localStorage.getItem(`${tableVariant}TableSettingsParameters`)
        const tableSettingsParameters: TableSettingsParameters = JSON.parse(tableSettingsParametersString || '{}')

        return tableSettingsParameters
    }
    else {
        const tableSettingsParametersString = fallBackStorage[`${tableVariant}TableSettingsParameters`]
        const tableSettingsParameters: TableSettingsParameters = JSON.parse(tableSettingsParametersString || '{}')

        return tableSettingsParameters
    }
    
}


*/ 
//# sourceMappingURL=TableSettingsParametersLocalStorage.js.map