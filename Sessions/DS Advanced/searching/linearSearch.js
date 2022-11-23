// linear search is a brute-force algorithm
// [1,2,3,4,5]
// algo has to traverse through the list till nth element(worst case) to find the desired index which gives a
// time complexity of O(n)(worst case) & best case O(1)


//for e.g.
// console.log('index of element 6 is: ', [1, 2, 3, 4, 5].indexOf(6));

let counter = 0;
const list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const findIndexOfAnElementUsingLinearSearch = (element) => {
    for (let i = 0; i < list.length; i++) {
        counter++;
        if (element === list[i]) {
            return i;
        }
    }
    return -1;
}

// console.log('index of element 1 is: ', findIndexOfAnElementUsingLinearSearch(1));
// console.log('Counter: ', counter);


//to find indices of an element from an unsorted list
// time complexity will be O(n) for all cases
const findIndicesOfAnElementUsingLinearSearch = (element) => {
    let list = [1, 2, 4, 6, 2, 3, 5, 2, 7, 8];
    let indices = [];
    for (let index = 0; index < list.length; index++) {
        counter++;
        if (element === list[index]) {
            indices.push(index);
        }
    }
    if (indices.length) {
        return indices;
    } else {
        return -1;
    }
}

console.log('index of element 16 is: ', findIndicesOfAnElementUsingLinearSearch(1));
console.log('Counter: ', counter);