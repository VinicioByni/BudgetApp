
// Move to more common folder later when working on Tiles
export type periodInitialDate = {
    periodInitialDate?: string
}



export type TableParameters = periodInitialDate & {
    searchString?: string
    searchDate?: string
    sort?: string
    pageSize?: number
    pageNumber?: number
}
