

//quick sort we divide the collection/list in to equal parts is by taking the pseudo element as pivot value
// elements which are smaller than pivot element  are moved to left and bigger are moved to right.

//this process is repeated to the left & right of the pivot until the whole array is sorted

// const unsortedList = [4, 8, 1, 7, 3, 10, 2, 9, 5, 6];
// [4, 1, 3, 2, 5]     [6]     [8, 7, 10, 9]
// [4, 1, 3, 2] [5] []         [8, 7] [9] [10]
// [1] [2] [4,3]
//         [][3][4]
//     [1,2,3,4,5]

// const unsortedList = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
const unsortedList = [4, 8, 1, 7, 3, 10, 2, 9, 5, 6];
// const unsortedList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let counter = 0;

const partition = (arr, start, end) => {
    let pivotElement = arr[end];
    let pivotIndex = start;
    for (let i = start; i < end; i++) {
        counter++;
        if (arr[i] < pivotElement) {
            //swapping
            [arr[i], [arr[pivotIndex]]] = [arr[pivotIndex], [arr[i]]]
            pivotIndex++;
        }
    }
    //swap pivot index to place it in the middle
    [arr[pivotIndex], arr[end]] = [arr[end], arr[pivotIndex]];
    return pivotIndex;
}

const quickRecursionSort = (list, start, end) => {
    if (end <= start) {
        return;
    }
    let index = partition(list, start, end);
    //recursively call the self method again with new list, start & end
    quickRecursionSort(list, start, index - 1);
    quickRecursionSort(list, index + 1, end);
}
quickRecursionSort(unsortedList, 0, unsortedList.length - 1);

console.log('*** Sorted List ***', unsortedList);
console.log('Counter: ', counter);

// due to bad pivot index selection we receive the worst complexity as O(n2)
// but repeatedly choosing the pivot element (one that is less than/greater than) pivot element it gives
// us the complexity as O(nlogn);