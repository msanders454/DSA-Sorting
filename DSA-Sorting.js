//1. 

// 21, 1, 26, 45, 29, 28, 2, 9, 16, 49, 39, 27, 43, 34, 46, 40

//1st recursive call - [21, 1, 26, 45, 29, 28, 2, 9]
//2nd recursive call - [21, 1, 26, 45]
//3rd recursive call - [21, 1]

//What is the resulting list that will be sorted after 16 recursive calls to mergesort?
//4th recursive call - [21]
//5th recursive call - [1]
//6th recursive call - [26, 45]
//7th recursive call - [26]
//8th recursive call - [45]
//9th recursive call - [29, 28, 2, 9]
//10th recursive call - [29, 28]
//11th recursive call - [29]
//12th recursive call - [28]
//13th recursive call - [2, 9]
//14th recursive call - [2]
//15th recursive call - [9]
//16th recursive call - [16, 49, 39, 27, 43, 34, 46, 40]

//What are the first 2 lists to be merged?
//[21] and [1]

//Which two lists would be merged on the 7th merge?
//[1, 21, 26, 45] and [2, 9, 28, 29]


//2. 

//After first partition: 3 9 1 14 17 24 22 20
    //The pivot could be either 14 or 17. Everything to the left of the pivot must be less than the pivot,
    //and everything to the right of the pivot must be greater than the pivot. 


//Last number as pivot:
    //First partition: 10, 3, 9, 12, 19, 14, 17, 16, 13, 15
    //Second partition: 3, 9, 10, 12, 19, 14, 17, 16, 13, 15

//First number as pivot:

    //First partition: 13, 10, 3, 9, 12, --14--, 15, 19, 16, 17
    //Second partition: 10, 3, 9, 12, 14, 15, 19, 16, 17


//3.

function qSort(array, start=0, end=array.length) {
  if (start >= end) {
    return array;
  }
  const middle = partition(array, start, end);
  array = qSort(array, start, middle);
  array = qSort(array, middle+1, end);
  return array;
}

function partition(array, start, end) {
  const pivot = array[end-1];
  let j = start;
  for (let i = start; i < end-1; i++) {
    if(array[i] <= pivot) {
      swap(array, i, j);
      j++;
    }
  }
  swap(array, end-1, j);
  return j;
}

function swap (array, i, j) {
  const tmp = array[i];
  array[i] = array[j];
  array[j] = tmp;
}

function main(){
  const sorted = '89 30 25 32 72 70 51 42 25 24 53 55 78 50 13 40 48 32 26 2 14 33 45 72 56 44 21 88 27 68 15 62 93 98 73 28 16 46 87 28 65 38 67 16 85 63 23 69 64 91 9 70 81 27 97 82 6 88 3 7 46 13 11 64 76 31 26 38 28 13 17 69 90 1 6 7 64 43 9 73 80 98 46 27 22 87 49 83 6 39 42 51 54 84 34 53 78 40 14 5'.split(' ').map(item => Number(item));;
  console.log(sorted);
  let ok = true;
  for (let i=0; i<sorted.length-1; i++) {
    if (sorted[i] > sorted[i+1]) ok = false;
  }
  console.log(ok);
}
main();


//4.

const mSort = function(array) {
    if (array.length <= 1) {
        return array;
    };
    const middle = Math.floor(array.length / 2);
    let left = array.slice(0, middle);
    let right = array.slice(middle, array.length);
    left = mSort(left);
    right = mSort(right);
    return merge(left, right, array);
};
const merge = function(left, right, array) {
    let leftIndex = 0;
    let rightIndex = 0;
    let outputIndex = 0;
    while (leftIndex < left.length && rightIndex < right.length) {
        if (left[leftIndex] < right[rightIndex]) {
            array[outputIndex++] = left[leftIndex++];
        }
        else {
            array[outputIndex++] = right[rightIndex++];
        };
    };
    for (let i = leftIndex; i < left.length; i++) {
        array[outputIndex++] = left[i];
    };
    for (let i = rightIndex; i < right.length; i++) {
        array[outputIndex++] = right[i];
    };
    return array;
};

function main() {
    const sorted = '89 30 25 32 72 70 51 42 25 24 53 55 78 50 13 40 48 32 26 2 14 33 45 72 56 44 21 88 27 68 15 62 93 98 73 28 16 46 87 28 65 38 67 16 85 63 23 69 64 91 9 70 81 27 97 82 6 88 3 7 46 13 11 64 76 31 26 38 28 13 17 69 90 1 6 7 64 43 9 73 80 98 46 27 22 87 49 83 6 39 42 51 54 84 34 53 78 40 14 5'.split(' ').map(item => Number(item));
    console.log(sorted);
    let ok = true;
    for (let i = 0; i < sorted.length - 1; i++) {
      if (sorted[i] > sorted[i + 1]) ok = false;
    }
    console.log(ok);
  }
  main();


//5.

"use strict";
const LinkedList = require("./list");
const { display } = require("./listFns");

function mSortList(list) {
  let currNode = list.head;
  if (currNode.next === null) {
    return list;
  }
  let length = 1;
  while (currNode.next !== null) {
    length++;
    currNode = currNode.next;
  }
  const middleI = Math.floor(length / 2);
  let leftList = splitList(list, 0, middleI);
  let rightList = splitList(list, middleI, length);
  leftList = mSortList(leftList);
  rightList = mSortList(rightList);

  return mergeLists(leftList, rightList);
}

function splitList(list, startI, endI) {
  let currNode = list.head;
  if (currNode === null) return;
  const returnList = new LinkedList();
  let i = 0;
  while (currNode !== null) {
    if (i >= startI && i < endI) {
      returnList.insertLast(currNode.value);
    }
    i++;
    currNode = currNode.next;
  }
  return returnList;
}

function mergeLists(leftList, rightList) {
  const mergedList = new LinkedList();
  let currLeft = leftList.head;
  let currRight = rightList.head;

  while (currLeft && currRight) {
    if (currLeft.value <= currRight.value) {
      mergedList.insertLast(currLeft.value);
      currLeft = currLeft.next;
    }
    else {
      mergedList.insertLast(currRight.value);
      currRight = currRight.next;
    }
  }

  while (currLeft) {
    mergedList.insertLast(currLeft.value);
    currLeft = currLeft.next;
  }
  while (currRight) {
    mergedList.insertLast(currRight.value);
    currRight = currRight.next;
  }
  return mergedList;
}

function main() {
  const LL = new LinkedList();
  LL.insertFirst(7);
  LL.insertFirst(8);
  LL.insertFirst(3);
  LL.insertFirst(6);
  LL.insertFirst(4);
  LL.insertFirst(1);
  LL.insertFirst(2);
  LL.insertFirst(5);

  const sorted = mSortList(LL);
  display(sorted);
}
main();

function main2() {
  const LL1 = new LinkedList();
  LL1.insertFirst(2);

  const LL2 = new LinkedList();
  LL2.insertFirst(4);

  const merged = mergeLists(LL1, LL2);
  display(merged);
}

//6. 

const bucketSort = function(array, low, high) {
    const result = new Array(high - low + 1);
    for (let i = 0; i < arr.length; i++){
      result[array[i] - low] = (result[array[i] - low] || 0) + 1;
    };
    const answer = [];
    for (let i = low; i <= high; i++) {
      for (let j = 0; j < result[i-low]; j++) {
        answer.push(i);
      };
    };
    return answer;
};
const bucketData = [8, 5, 4, 1, 2, 3, 4, 4, 10, 6, 7];
console.log(bucketSort(bucketData, 1 , 10))


//7. 
const sortInPlace = function(array) {
    for (let i = 0; i < array.length; i++) {
        let j = Math.floor(Math.random() * array.length);
        swap(array, i, j);
    };
    return array;
};
console.log(sortInPlace([1, 2, 3, 4, 5]));


function swap(i, j, array) {
  const temp = array[i];
  array[i] = array[j];
  array[j] = temp;
}

function main() {
  shuffle(DATA);
  console.log(DATA);
}
main();


//8. 


const books = [
    'The Great Gatsby',
    'Catch-22',
    'Lolita',
    'Beloved',
    'Harry Potter',
    'To Kill a Mocking Bird',
    '1984',
    'Brave New World',
    'A Brief History of Time',
    'All the Presidents Men',
    'Fahrenheit 451'
];
console.log(mSort(books));
