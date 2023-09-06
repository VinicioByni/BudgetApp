export const defaultSearchString = ""
export const defaultSearchDateString = ""
export const defaultSelectedHeader = "Date"
export const defaultSortOrder = "Descending"
export const defaultPageSize = 2
export const defaultPageNumber = 1

type FilteringParameters = {
    searchString: string
    searchDateString: string
}

type SortingParameters = {
    selectedHeader: string,
    order: string,
    sortOrder: string
}

type PagingParameters = {
    pageSize: number ,
    pageNumber: number 
}

const filteringParameters: FilteringParameters = {
    searchString: defaultSearchString,
    searchDateString: defaultSearchDateString
}

const sortingParameters: SortingParameters = {
    selectedHeader: defaultSelectedHeader,
    order: defaultSortOrder,
    sortOrder: defaultSelectedHeader + defaultSortOrder

}

const pagingParameters: PagingParameters = {
    pageSize: defaultPageSize,
    pageNumber: defaultPageNumber
}

export type TableSettingsParameters = {
    filteringParameters: FilteringParameters,
    sortingParameters: SortingParameters,
    pagingParameters: PagingParameters
}

export const defaultTableSettingsParameters: TableSettingsParameters = {
    filteringParameters,
    sortingParameters,
    pagingParameters
}



