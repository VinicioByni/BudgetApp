import { getTableApiUrls } from '../CRUD/TableApiUrls.js'
import { fetchRead } from '../CRUD/ReadApi.js'


export const fetchDelete = function (id: number, tableVariant) {

    const tableApiUrls = getTableApiUrls(tableVariant)
    const deleteParametersUrl = deleteParametersToUrl(id)

    fetch(tableApiUrls.Delete + deleteParametersUrl, {
        method: "DELETE"
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Delete fetch network error')
            }
            return response.text()
        })
        .then(text => {
        })
        .catch(error => {
            console.error('Delete fetch table error', error)
        })
        .finally(() => {
            fetchRead(tableVariant)
        })
}

function deleteParametersToUrl(id: number): string {

    return `Id=${id}`
}