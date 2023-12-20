/*import { getTableSettingsParameters, setTableSettingsParameters } from '../TableSettingsParameters/TableSettingsParametersLocalStorage.js'
import { safeToString } from '../../Utilities/StringUtilities.js'
import { loadTable } from '../CRUD/ReadLogic.js'
import { defaultSearchString } from '../TableSettingsParameters/TableSettingsParameters.js'

const activeInputBorderColor = "#1c7fce"

export const filterTable = function(tableVariant: string) {

    const tableSettingsParameters = getTableSettingsParameters(tableVariant)

    const searchInput = document.querySelector(`#${tableVariant}SearchInput`)
    if (searchInput instanceof HTMLInputElement) {
        searchInput.value = tableSettingsParameters.filteringParameters.searchString

        if (searchInput.value !== defaultSearchString) {
            searchInput.style.borderColor = activeInputBorderColor
        }
    }

    const searchDateInput = document.querySelector(`#${tableVariant}SearchDateInput`)
    if (searchDateInput instanceof HTMLInputElement) {
        searchDateInput.value = tableSettingsParameters.filteringParameters.searchDateString

        if (searchDateInput.value !== defaultSearchString) {
            searchDateInput.style.borderColor = activeInputBorderColor
        }
    }

    // Search
    const searchForm = document.querySelector(`#${tableVariant}SearchForm`)
    
    searchForm.addEventListener('submit', function (event) {
        event.preventDefault()

        if (event.target instanceof HTMLFormElement) {
            const formData = new FormData(event.target)
            const searchValue = safeToString(formData.get('search'), "")
            const searchDateValue = safeToString(formData.get('searchDate'), "")

            tableSettingsParameters.filteringParameters.searchString = searchValue
            tableSettingsParameters.filteringParameters.searchDateString = searchDateValue
            setTableSettingsParameters(tableVariant, tableSettingsParameters)
            loadTable(tableVariant)
        }
        else {
            Error('Filter table input error')
        }
    })


  
}

*/
//# sourceMappingURL=FiltersFunctions.js.map