

// Selection sort starts from first element by considering it as minimum element and then traverse through
//all the other element in the list to check if any element is less than it, if an element is found
//minimum than your index value thn swapping is performed.

// const unsortedList = [3, 8, 7, 2, 10, 6, 4, 9, 1, 5];

// first outer loop --> will iterate the elements from the list
// first iteration of outer loop
// 1st iteration of outer loop (// index(pointer) --> i = 0 --> 3(value) --> minimum_value

//second inner loop will run from i+1 to n --> do comparison and find minimum_value
// minimum_vaue = 3rd index
// minimum_vaue = 9th index

// after first inner loop
// [1, 8, 7, 2, 10, 6, 4, 9, 3, 5];
// )

// input --> [[1], 8, 7, 2, 10, 6, 4, 9, 3, 5];
// 2nd Iteration of outer Loop ( index(pointer) --> i = 1 --> 8(value) --> minimum_value

//     second inner loop will run from i+1 to n --> do comparison and find minimum_value
//         minimum_vaue = 2nd index
//         minimum_vaue = 3rd index

// // after first inner loop
// [[1, 2], 7, 8, 10, 6, 4, 9, 3, 5];
// )

// [[1, 2, 3], 8, 10, 6, 4, 9, 7, 5];
const unsortedList = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
// const unsortedList = [4, 8, 1, 7, 3, 10, 2, 9, 5, 6];
// const unsortedList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]; 
let innerLoop = 0;
let outerLoop = 0;
const sortElementsUsingSelectionSort = () => {
    let listLength = unsortedList.length;
    for (let i = 0; i < listLength; i++) {
        outerLoop++;
        let minIndex = i;
        for (let j = i + 1; j < listLength; j++) {
            innerLoop++;
            if (unsortedList[j] < unsortedList[minIndex]) {
                minIndex = j;
            }
        }
        if (minIndex != i) {
            [unsortedList[i], unsortedList[minIndex]] = [unsortedList[minIndex], unsortedList[i]];
        }
    }
    return unsortedList;
}

console.log('*** Sorted List ***', sortElementsUsingSelectionSort());
console.log('innerLoop: ', innerLoop);
console.log('outerLoop: ', outerLoop);

/**
 * In worst case time complexity in the worst case is O(n2)
 * In best case also O(n2)
 * inefficient to use as compared to bubble sort
 */

// mongoDb-- > find().sort({ field_name: 1 });