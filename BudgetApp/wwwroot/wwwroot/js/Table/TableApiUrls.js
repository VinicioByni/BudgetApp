import { getTableSettingsParameters } from './TableSettingsParametersLocalStorage.js';
import { titleCase } from '../StringUtilities.js';
import { periodInitialDate } from '../DataPeriodSelection.js';
// PENDING ! Add, if local storage is unavailable, use the defaultTAbleSettingsParameters directly
export var getTableApiUrls = function (tableVariant) {
    var tableVariantTitleCase = titleCase(tableVariant);
    var tableSettingsParameters = getTableSettingsParameters(tableVariant);
    var periodInitialDateString;
    if (periodInitialDate === undefined) {
        periodInitialDateString = "";
    }
    else {
        periodInitialDateString = periodInitialDate;
    }
    var tableApiUrls = {
        Create: "/".concat(tableVariantTitleCase, "Table/Add").concat(tableVariantTitleCase, "?"),
        Read: "/".concat(tableVariantTitleCase, "Table/_").concat(tableVariantTitleCase, "sPartial?") + getSettingsUrl(tableSettingsParameters) + "&periodInitialDateString=" + periodInitialDateString,
        Update: "/".concat(tableVariantTitleCase, "Table/Edit").concat(tableVariantTitleCase, "?"),
        Delete: "/".concat(tableVariantTitleCase, "Table/Delete").concat(tableVariantTitleCase, "?")
    };
    return tableApiUrls;
};
function getSettingsUrl(tableSettingsParameters) {
    var settingsUrl = "sortOrder=".concat(tableSettingsParameters.sortingParameters.sortOrder, "&searchString=").concat(tableSettingsParameters.filteringParameters.searchString, "&searchDateString=").concat(tableSettingsParameters.filteringParameters.searchDateString, "&pageSize=").concat(tableSettingsParameters.pagingParameters.pageSize, "&pageNumber=").concat(tableSettingsParameters.pagingParameters.pageNumber);
    return settingsUrl;
}
//# sourceMappingURL=TableApiUrls.js.map