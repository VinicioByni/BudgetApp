import { getTableSettingsParameters, setTableSettingsParameters } from '../TableSettingsParameters/TableSettingsParametersLocalStorage.js'
import { loadTable } from '../CRUD/ReadLogic.js'


export const sortTable = function (tableVariant: string) {

    // Sort
    const tableSettingsParameters = getTableSettingsParameters(tableVariant)
    
    const headers = document.querySelectorAll(`#${tableVariant}Table th`)
    headers.forEach(header => {
        header.addEventListener('click', function () {
            
            let header: string = this.dataset.cell

           
            let selectedHeader = tableSettingsParameters.sortingParameters.selectedHeader
            let order = tableSettingsParameters.sortingParameters.order

            if (header !== selectedHeader) {
                
                tableSettingsParameters.sortingParameters.order = "Descending"
            }
            else if (order === "Descending") {
                
                tableSettingsParameters.sortingParameters.order = "Ascending"
            }
            else {
                
                tableSettingsParameters.sortingParameters.order = "Descending"
            }
            
            tableSettingsParameters.sortingParameters.selectedHeader = header
            tableSettingsParameters.sortingParameters.sortOrder = header + tableSettingsParameters.sortingParameters.order
            setTableSettingsParameters(tableVariant, tableSettingsParameters)

            loadTable(tableVariant)
        })

    })
}