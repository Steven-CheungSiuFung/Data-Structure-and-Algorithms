// Bubble Sort
// [2, 5, 3, 1, 9, 6, 8, 7, 4]
const bubbleSort = (array) => {
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length - 1; j++) {
      if (array[j] > array[j + 1]) {
        let holder = array[j];
        array[j] = array[j + 1];
        array[j + 1] = holder;
      }
    }
  }
  return array;
  // O(n^2)
};

// Selection Sort
const slectionSort = (array) => {
  // start from index 0
  for (let i = 0; i < array.length; i++) {
    // locate the index of the smallest number in the rest of the array
    let smallNumberIndex = i;
    for (let j = i + 1; j < array.length; j++) {
      if (array[j] < array[smallNumberIndex]) {
        smallNumberIndex = j;
      }
    }
    // switch the smallest number to the current index
    if (smallNumberIndex > i) {
      let temp = array[i];
      array[i] = array[smallNumberIndex];
      array[smallNumberIndex] = temp;
    }
  }
  return array;
};

// Insertion Sort
// [2, 5, 3, 1, 9, 6, 8, 7, 4]
const insertionSort = (array) => {
  for (let i = 0; i < array.length; i++) {
    if (array[i] < array[0]) {
      array.splice(0, 0, array[i]);
      array.splice(i + 1, 1);
    } else {
      for (let j = 1; j < i; j++) {
        if (array[i] < array[j] && array[i] >= array[j - 1]) {
          array.splice(j, 0, array[i]);
          array.splice(i + 1, 1);
        }
      }
    }
  }
  return array;
  // O(n^2);
  // can be Ω(n) in almost sorted case;
};

// Merge Sort
// [11, 2, 5, 99, 3, 10, 1, 9, 12, 6, 8, 7, 4]
const mergeSort = (array) => {
  // 1. split the array into left and right
  const splitArray = (array) => {
    if (array.length === 1) {
      return array;
    } else {
      const leftArray = array.slice(0, Math.floor(array.length / 2));
      const rightArray = array.slice(Math.floor(array.length / 2));
      return merge(splitArray(leftArray), splitArray(rightArray));
    }
  };

  // 2. compare and merge
  // [5], [2] => [2, 5]
  // [1], [7] => [1, 7]
  // [2, 5], [1, 7] => [1, 2, 5, 7]
  const merge = (array1, array2) => {
    const newArray = [];
    let i = 0;
    let j = 0;
    while (newArray.length !== array1.length + array2.length) {
      if (j === array2.length) {
        newArray.push(array1[i]);
        i++;
      } else if (i === array1.length) {
        newArray.push(array2[j]);
        j++;
      } else if (array1[i] < array2[j]) {
        newArray.push(array1[i]);
        i++;
      } else {
        newArray.push(array2[j]);
        j++;
      }
    }
    return newArray;
  };

  return splitArray(array);
  // O(NLogN)
};

/* Quick Sort with Recursion */

const recursion = (array, left, right) => {
  if (right < left || right === left || left > right) return;

  let i = left;
  let j = left;

  while (j !== right) {
    if (array[j] < array[right]) {
      let temp = array[j];
      array[j] = array[i];
      array[i] = temp;
      i++;
    }
    j++;
  }

  let temp = array[right];
  array[right] = array[i];
  array[i] = temp;

  recursion(array, left, i - 1);
  recursion(array, i + 1, right);
};

const quickSort = (array) => {
  recursion(array, 0, array.length - 1);
  return array;
  // T: O(nlogn);
  // S: O(logn);
};

/* Hoare's quick select */
// find the smallest kth value in an unsorted array;
const hoareQuickSort = (array, left, p, k) => {
  let partitionPointer = left;
  for (let j = left; j < p; j++) {
    if (array[j] < array[p]) {
      const temp = array[partitionPointer];
      array[partitionPointer] = array[j];
      array[j] = temp;
      partitionPointer++;
    }
  }
  let temp = array[p];
  array[p] = array[partitionPointer];
  array[partitionPointer] = temp;

  if (partitionPointer === k) {
    return partitionPointer;
  }

  const indexToFind =
    partitionPointer > k
      ? hoareQuickSort(array, left, partitionPointer - 1, k)
      : hoareQuickSort(array, partitionPointer + 1, p, k);
  return indexToFind;
};

const hoareQuickSelect = (array, k) => {
  const indexToFind = hoareQuickSort(array, 0, array.length - 1, k - 1);
  return array[indexToFind];
};
