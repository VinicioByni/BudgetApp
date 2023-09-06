import { filterTable } from '../Filter/FiltersFunctions.js';
import { pagingTable } from '../Paging/PagingFunctions.js';
import { clearTableFilterSettings } from '../Clear/ClearTableFilterSettings.js';
import { getTableApiUrls } from './TableApiUrls.js';
import { sortTable } from '../Sorting/SortingFunctions.js';
import { updateRow } from './UpdateLogic.js';
import { deleteRow } from './DeleteLogic.js';
import { createRow } from './CreateLogic.js';
import { updateAllTileAmounts } from '../../Tiles/Tiles.js';
export var fetchRead = function (tableVariant) {
    var tableApiUrls = getTableApiUrls(tableVariant);
    fetch(tableApiUrls.Read)
        .then(function (response) {
        if (!response.ok) {
            throw new Error('Read network response was not ok');
        }
        return response.text();
    })
        .then(function (text) {
        var container = document.getElementById("".concat(tableVariant, "Partial"));
        container.innerHTML = text;
        // All table functions
        filterTable(tableVariant);
        pagingTable(tableVariant);
        clearTableFilterSettings(tableVariant);
        sortTable(tableVariant);
        updateRow(tableVariant);
        deleteRow(tableVariant);
        createRow(tableVariant);
        updateAllTileAmounts();
    })
        .catch(function (error) {
        console.error('Read fetch error', error);
    });
};
//# sourceMappingURL=ReadApi.js.map