import { isLocalStorageAvailable } from './Utilities/LocalStorageUtilities.js'

let fallBackStorage: Record<string, string> = {}

export const isPeriodInitialDateSet = function () {

    let periodInitialDate: string
    if (isLocalStorageAvailable()) {
        periodInitialDate = localStorage.getItem('periodInitialDate')
    }
    else {
        periodInitialDate = fallBackStorage['periodInitialDate']
    }
    
    if (periodInitialDate === null || periodInitialDate === undefined) {
        return false
    }

    return true
}

export const setPeriodInitialDate = function (periodInitialDate: string) {
    if (isLocalStorageAvailable()) {
        localStorage.setItem('periodInitialDate', periodInitialDate)
    }
    else {
        fallBackStorage['periodInitialDate'] = periodInitialDate
    }
    
}

export const getPeriodInitialDate = function () {
    if (isLocalStorageAvailable()) { 
        return localStorage.getItem('periodInitialDate')  
    }
    else {
        return fallBackStorage['periodInitialDate']
    }
             
}