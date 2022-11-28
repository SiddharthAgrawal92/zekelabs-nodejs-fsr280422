
//bucket sort
// elements are sorted in buckets with fixed size using some other algorithm

let counter = 0;
const bucketSort = (list) => {
    let min = list[0];
    let max = list[0];
    list.forEach(currentElement => {
        counter++;
        if (currentElement < min) {
            min = currentElement;
        } else if (currentElement > max) {
            max = currentElement;
        }
    });
    let bucketSize = 5;
    let bucketCount = Math.floor((max - min) / bucketSize) + 1;
    let allBuckets = new Array(bucketCount);

    //initialize buckets with empty array
    for (let i = 0; i < allBuckets.length; i++) {
        allBuckets[i] = [];
    }

    //insert values to buckets
    list.forEach(element => {
        counter++;
        allBuckets[Math.floor((element - min) / bucketSize)].push(element);
    });

    //make the original list empty
    list.length = 0;

    //do the sorting of allBuckets elements and push to the original array that has been emptied
    allBuckets.forEach(bucket => {
        bucket.sort((a, b) => { return a - b });
        bucket.forEach(element => {
            list.push(element);
        });
    });
    return list;
}

//Sorting Method-1 --> Using Array.sort()
//MSorting Method-2 --> custom insertion()
// const insertion = () => { }

// const unsortedList = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
const unsortedList = [4, 8, 1, 7, 3, 10, 2, 9, 5, 6];
// const unsortedList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
console.log('Sorted List: ', bucketSort(unsortedList));
console.log('Counter: ', counter);