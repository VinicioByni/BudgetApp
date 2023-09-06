export var pagination = function (totalItems, pageSize, currentPage) {
    // Return values
    var array = [];
    var numberOfBtns;
    var maxBtns = 5;
    var minBtns = 1;
    var middlePosition = 2;
    var numberOfPages = Math.ceil(totalItems / pageSize);
    var startingNumber;
    // Number of btns logic
    if (numberOfPages >= maxBtns) {
        numberOfBtns = maxBtns;
    }
    else {
        numberOfBtns = numberOfPages;
        startingNumber = minBtns;
        for (var position = 0; position < numberOfBtns; position++) {
            array[position] = startingNumber + position;
        }
        return { array: array, numberOfBtns: numberOfBtns };
    }
    // Btns array logic
    if ((currentPage - minBtns) >= middlePosition && numberOfPages - currentPage >= middlePosition) {
        startingNumber = currentPage - middlePosition;
    }
    else if ((currentPage - minBtns) < middlePosition) {
        startingNumber = currentPage - (currentPage - minBtns);
    }
    else {
        startingNumber = currentPage - ((maxBtns - minBtns) - (numberOfPages - currentPage));
    }
    for (var position = 0; position < numberOfBtns; position++) {
        array[position] = startingNumber + position;
    }
    return { array: array, numberOfBtns: numberOfBtns };
};
//# sourceMappingURL=Pagination.js.map