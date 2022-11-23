
// it is also known as divide and conquer algorithm
// time complexity of it is O(log2n) in worst case and O(1) in best case
// [1(min), 2, 3, 4, 5, 6(midPoint), 7, 8, 9, 10, 11(max)]

// note --> this works in sorted list only
// [1, 2, 3, 4, 5, 6, 7(min), 8, 9(midPoint), 10, 11(max)]
//list[midpoint] == element ?  return the value : go to comparison to check if element lies at RHS/LHS

let counter = 0;
const findIndexOfElementUsingBinarySearch = (element) => {
    const sortedList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
    let minIndex = 0;
    let maxIndex = sortedList.length - 1;
    //optimization #1
    if (element === sortedList[minIndex]) {
        counter++;
        return minIndex;
    } else if (element === sortedList[maxIndex]) {
        counter++;
        return maxIndex;
    }

    while (minIndex <= maxIndex) {
        counter++;
        let middleIndex = Math.floor((minIndex + maxIndex) / 2);
        if (element === sortedList[middleIndex]) {
            return middleIndex;
        } else if (element > sortedList[middleIndex]) {
            //optimization #2.1
            minIndex = middleIndex + 1;
            if (sortedList[minIndex] === element) {
                return minIndex;
            }
        } else { //element < middleIndex
            maxIndex = middleIndex - 1;
            //optimization #2.2
            if (sortedList[maxIndex] === element) {
                return maxIndex;
            }
        }
    }
    return -1;
}


console.log('Index of Element Using Binary Search is: ', findIndexOfElementUsingBinarySearch(5));
console.log('Counter: ', counter);