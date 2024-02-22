
// Move to more common folder later when working on Tiles
export type periodInitialDate = {
    periodInitialDate?: string
}

export type TableParameters = periodInitialDate & {
    searchString?: string
    searchDate?: string
    sortOption?: string
    sortOrder?: string
    pageSize?: number
    pageNumber?: number
}
