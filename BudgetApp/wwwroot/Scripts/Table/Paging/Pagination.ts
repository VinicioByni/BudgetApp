
export const pagination = function (totalItems:number, pageSize:number, currentPage:number) {
    // Return values
    let array: number[] = []
    let numberOfBtns: number

    let maxBtns = 5
    let minBtns = 1
    let middlePosition = 2
    let numberOfPages = Math.ceil(totalItems / pageSize) 
    let startingNumber: number

    // Number of btns logic
    if (numberOfPages >= maxBtns) {
        numberOfBtns = maxBtns
    }
    else {
        numberOfBtns = numberOfPages
        startingNumber = minBtns
        for (var position = 0; position < numberOfBtns; position++) {
            array[position] = startingNumber + position;
        }

        return { array, numberOfBtns }
    }

    // Btns array logic
    if ((currentPage - minBtns) >= middlePosition && numberOfPages - currentPage >= middlePosition) {
        startingNumber = currentPage - middlePosition
    }
    else if ((currentPage - minBtns) < middlePosition) {
        startingNumber = currentPage - (currentPage - minBtns)
    }
    else {
        startingNumber = currentPage - ((maxBtns - minBtns) - (numberOfPages - currentPage))
    }
    for (var position = 0; position < numberOfBtns; position++) {
        array[position] = startingNumber + position;
    }

    return { array, numberOfBtns }
}


