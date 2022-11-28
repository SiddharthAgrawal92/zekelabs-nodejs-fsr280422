
// Merge Sort
// Divide and conquer method is applied in this in which we divide the list in smaller chunks and
// them merge them after sorting

//Steps
//1. Split the list in two halves
//2. continue to divide it in sub-arrays until all the elements are broken down to a single sub array
//3. Starting with single array do the comparison for merging them together
//4. Repeat step 3 until we get the whole list sorted.

let counter = 0;
const merge = (left, right) => {
    let arr = [];
    while (left.length && right.length) {
        counter++;
        if (left[0] < right[0]) { //length left = 4(0-3) -->  Array.pop() --> take out index no 3 & Array.shift() take out index no 0
            arr.push(left.shift());
        } else {
            arr.push(right.shift());
        }
    }

    //concatenate left right and sorted arr[]
    return [...arr, ...left, ...right];
}

const mergeSort = (array) => {
    if (array.length < 2) {
        return array;
    }

    const half = array.length / 2;
    const left = array.splice(0, half);
    return merge(mergeSort(left), mergeSort(array));
}

// const unsortedList = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
const unsortedList = [4, 8, 1, 7, 3, 10, 2, 9, 5, 6];
// const unsortedList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
console.log('Sorted Array', mergeSort(unsortedList));
console.log('Counter', counter);

//Array.sort()  --> Merge Sort is used in the Prototypical sort() method of an Array in javascript
//Insertion sort is also used in the above method to sort out smaller lists(length 42 in the list are considered using insertion)


//Time Complexity in Worst case O(nlogn) of merge sort is equivalent to best case of quick sort
// For all 3 cases best, average & worst it's O(nlogn) because it divides the array into smaller parts
// even if your list is sorted

//This algo is not in-place algo as it uses extra space for the input auxillary sub-arrays as helper
// space O(n)