

// insertion sort checks for the current index value to all other values in inner loop starting from i+1 to >=0

// const unsortedList = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
const unsortedList = [4, 8, 1, 7, 3, 10, 2, 9, 5, 6];
// const unsortedList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let innerLoop = 0;
let outerLoop = 0;
const insertionSort = () => {
    const listLength = unsortedList.length;
    for (let i = 1; i < listLength; i++) {
        outerLoop++;
        let currentValue = unsortedList[i];
        let j = i - 1;
        while (j >= 0 && unsortedList[j] > currentValue) {
            innerLoop++;
            //similar to while-loop for-loop
            // for (let j = i - 1; j >= 0 && unsortedList[j] > currentValue; j--) { }
            unsortedList[j + 1] = unsortedList[j];
            j--;
        }
        unsortedList[j + 1] = currentValue;

        // //while 1st time will not run
        // [[4, 8, 1], 7, 3, 10, 2, 9, 5, 6];

        // //while 2nd time will run
        //     Iteration #1. [[4, 8, 1], 7, 3, 10, 2, 9, 5, 6];
        //                         j  i(currentValue = 1)
        //     Iteration #2. [[4, 8, 8], 7, 3, 10, 2, 9, 5, 6];
        //                     j     i(currentValue = 1)
        //                     j-- = -1
        //                    [[4, 4, 8], 7, 3, 10, 2, 9, 5, 6];

        // when 2nd while loop ends        
        // j+1 = unsortedList[0] = currentValue;
        // [[1, 4, 8], 7, 3, 10, 2, 9, 5, 6];        
    }
    return unsortedList;
}

console.log('*** Sorted List ***', insertionSort());
console.log('innerLoop: ', innerLoop);
console.log('outerLoop: ', outerLoop);


/**
 * In best case time complexity is O(n) i.e. linear
 * in worst/average case it will be O(n2)
 * 
 * in smaller list this is very good to use but not in case of larger list for which we can use 
 * quick and merge where we have an average time complexity of O(nlogn)
 * 
 * because of it's good performance in short list we use it as a helper algo in other 
 * sorting algo like bucket sort.
 */