import { areTableSettingsParametersSet, setTableSettingsParameters } from '../TableSettingsParameters/TableSettingsParametersLocalStorage.js';
import { defaultTableSettingsParameters } from '../TableSettingsParameters/TableSettingsParameters.js';
import { getTableSettingsParameters } from '../TableSettingsParameters/TableSettingsParametersLocalStorage.js';
import { isPeriodInitialDateSet, setPeriodInitialDate, getPeriodInitialDate } from '../../DataPeriodSelectionLocalStorage.js';
import { defaultPeriodInitialDate } from '../../DataPeriodSelection.js';
import { titleCase } from '../../Utilities/StringUtilities.js';
// PENDING ! Add, if local storage is unavailable, use the defaultTAbleSettingsParameters directly
export var getTableApiUrls = function (tableVariant) {
    var tableVariantTitleCase = titleCase(tableVariant);
    if (!areTableSettingsParametersSet(tableVariant)) {
        setTableSettingsParameters(tableVariant, defaultTableSettingsParameters);
    }
    if (!isPeriodInitialDateSet()) {
        setPeriodInitialDate(defaultPeriodInitialDate);
    }
    var periodInitialDate = getPeriodInitialDate();
    var tableSettingsParameters = getTableSettingsParameters(tableVariant);
    var tableApiUrls = createTableApiUrls(tableVariantTitleCase, tableSettingsParameters, periodInitialDate);
    return tableApiUrls;
};
function createTableApiUrls(tableVariantTitleCase, tableSettingsParameters, periodInitialDate) {
    var settingsUrl = "sortOrder=".concat(tableSettingsParameters.sortingParameters.sortOrder, "&searchString=").concat(tableSettingsParameters.filteringParameters.searchString, "&searchDateString=").concat(tableSettingsParameters.filteringParameters.searchDateString, "&pageSize=").concat(tableSettingsParameters.pagingParameters.pageSize, "&pageNumber=").concat(tableSettingsParameters.pagingParameters.pageNumber);
    var tableApiUrls = {
        Create: "/".concat(tableVariantTitleCase, "/Add").concat(tableVariantTitleCase, "?"),
        Read: "/".concat(tableVariantTitleCase, "/_").concat(tableVariantTitleCase, "sPartial?") + settingsUrl + "&periodInitialDateString=" + periodInitialDate,
        Update: "/".concat(tableVariantTitleCase, "/Edit").concat(tableVariantTitleCase, "?"),
        Delete: "/".concat(tableVariantTitleCase, "/Delete").concat(tableVariantTitleCase, "?")
    };
    return tableApiUrls;
}
//# sourceMappingURL=TableApiUrls.js.map