// unsorted = [12, 43, 6, 47, 5, 7, 8, 7, 82, 44];
// ascending  = [5, 6, 7, 7, 8, 12, 43, 44, 47, 82]

// it is comparison-type algorithm which compares value to all other unsorted values
// bubble sort takes maximum value to last index for sorting

// time complexity in worst case is O(n2)

// const unsortedList = [4, 8, 1, 7, 3, 10, 2, 9, 5, 6];
const unsortedList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let outerLoopCounter = 0;
let innerLoopCounter = 0;
const sortUsingBubbleSort = () => {
    let listLength = unsortedList.length;
    let max = unsortedList.length;
    //outer-loop
    for (let i = 0; i < listLength; i++) {
        outerLoopCounter++;
        let isSorted = true;
        //inner-loop
        for (let j = 0; j < max; j++) {
            if (unsortedList[j] > unsortedList[j + 1]) {
                //swapping way-1
                // let temp = unsortedList[j];
                // unsortedList[j] = unsortedList[j + 1];
                // unsortedList[j + 1] = temp;

                //swapping way-2
                [unsortedList[j], unsortedList[j + 1]] = [unsortedList[j + 1], unsortedList[j]];
                isSorted = false;
            }
            innerLoopCounter++;
        }
        //optimization #2 is to break the outer & inner loop if no values are swapped in first run of inner loop
        // that is if list is already sorted
        if(isSorted){
                break;
        }
        //optimization #1 to reduce the innerloop by listLength-noOfSortedElementsAtLastOfList
        max--;
    }
    return unsortedList;
}

console.log('Sorted List --> ', sortUsingBubbleSort());
console.log('InnerLoop: ', innerLoopCounter);
console.log('OuterLoop: ', outerLoopCounter);

//outer loop #1
    // inner loop #1 [4(j) <--> 8, 1, 7, 3, 10, 2, 9, 5, 6]
    // inner loop #2 [4, 8(j) <--> 1, 7, 3, 10, 2, 9, 5, 6] 
        //--> swapping [4, 1, 8(j), 7, 3, 10, 2, 9, 5, 6]
    // inner loop #3 [4, 1, 8 <--> 7, 3, 10, 2, 9, 5, 6]
        //--> swapping [4, 1, 7, 8(j), 3, 10, 2, 9, 5, 6]
