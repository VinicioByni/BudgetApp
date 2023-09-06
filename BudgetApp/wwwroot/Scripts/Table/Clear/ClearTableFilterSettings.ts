import { loadTable } from '../CRUD/ReadLogic.js'
import { defaultSearchString, defaultSearchDateString } from '../TableSettingsParameters/TableSettingsParameters.js'
import { getTableSettingsParameters, setTableSettingsParameters } from '../TableSettingsParameters/TableSettingsParametersLocalStorage.js'


export const clearTableFilterSettings = function (tableVariant) {

    const clearFiltersBtn = document.querySelector(`#${tableVariant}ClearBtn`)
  
    const searchInput = document.querySelector(`#${tableVariant}SearchInput`)
    const searchDateInput = document.querySelector(`#${tableVariant}SearchDateInput`)

    const clearedTableFilterParameters = getTableSettingsParameters(tableVariant)
    clearedTableFilterParameters.filteringParameters.searchString = defaultSearchString
    clearedTableFilterParameters.filteringParameters.searchDateString = defaultSearchDateString

    clearFiltersBtn.addEventListener('click', function () {
        setTableSettingsParameters(tableVariant, clearedTableFilterParameters)

        const tableSettingsParameters = getTableSettingsParameters(tableVariant)

        if (searchInput instanceof HTMLInputElement) {
            searchInput.value = tableSettingsParameters.filteringParameters.searchString
        }
        if (searchDateInput instanceof HTMLInputElement) {
            searchDateInput.value = tableSettingsParameters.filteringParameters.searchDateString
        }

        loadTable(tableVariant)
    })

    
}
