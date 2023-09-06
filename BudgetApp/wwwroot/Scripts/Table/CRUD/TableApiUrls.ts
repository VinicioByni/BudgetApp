
import { areTableSettingsParametersSet, setTableSettingsParameters } from '../TableSettingsParameters/TableSettingsParametersLocalStorage.js'
import { defaultTableSettingsParameters, TableSettingsParameters } from '../TableSettingsParameters/TableSettingsParameters.js'
import { getTableSettingsParameters } from '../TableSettingsParameters/TableSettingsParametersLocalStorage.js'
import { isPeriodInitialDateSet, setPeriodInitialDate, getPeriodInitialDate } from '../../DataPeriodSelectionLocalStorage.js'
import { defaultPeriodInitialDate } from '../../DataPeriodSelection.js'
import { titleCase } from '../../Utilities/StringUtilities.js'


type TableApiUrls = {
    Create: string
    Read: string
    Update: string
    Delete: string 
}

// PENDING ! Add, if local storage is unavailable, use the defaultTAbleSettingsParameters directly

export const getTableApiUrls = function (tableVariant:string): TableApiUrls {
    const tableVariantTitleCase = titleCase(tableVariant)

    if (!areTableSettingsParametersSet(tableVariant)) {
        setTableSettingsParameters(tableVariant, defaultTableSettingsParameters)
    }
    if (!isPeriodInitialDateSet()) {
        setPeriodInitialDate(defaultPeriodInitialDate)
    }

    const periodInitialDate = getPeriodInitialDate()
    const tableSettingsParameters = getTableSettingsParameters(tableVariant)
    
    const tableApiUrls = createTableApiUrls(tableVariantTitleCase, tableSettingsParameters, periodInitialDate)

    return tableApiUrls
}

function createTableApiUrls(tableVariantTitleCase: string, tableSettingsParameters: TableSettingsParameters, periodInitialDate: string): TableApiUrls {

    const settingsUrl = `sortOrder=${tableSettingsParameters.sortingParameters.sortOrder}&searchString=${tableSettingsParameters.filteringParameters.searchString}&searchDateString=${tableSettingsParameters.filteringParameters.searchDateString}&pageSize=${tableSettingsParameters.pagingParameters.pageSize}&pageNumber=${tableSettingsParameters.pagingParameters.pageNumber}`

    const tableApiUrls = {
        Create: `/${tableVariantTitleCase}/Add${tableVariantTitleCase}?`,
        Read: `/${tableVariantTitleCase}/_${tableVariantTitleCase}sPartial?` + settingsUrl + "&periodInitialDateString=" + periodInitialDate,
        Update: `/${tableVariantTitleCase}/Edit${tableVariantTitleCase}?`,
        Delete: `/${tableVariantTitleCase}/Delete${tableVariantTitleCase}?`

    }
    return tableApiUrls
}
