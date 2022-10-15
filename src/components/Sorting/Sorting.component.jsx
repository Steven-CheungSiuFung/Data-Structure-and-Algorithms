import React from 'react';

const Sorting = () => {
    const numbers = [2, 5, 3, 1, 9, 6, 8, 7, 4];

    // Bubble Sort
    // [2, 5, 3, 1, 9, 6, 8, 7, 4]
    const bubbleSort = (array) => {
        for (let i = 0; i < array.length; i++) {
            for (let j = 0; j < array.length; j++) {
                if (array[j] > array[j+1]) {
                    let holder = array[j];
                    array[j] = array[j+1];
                    array[j+1] = holder;
                }
            }
        }
        return array;
        // O(n^2)
    }

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
    }

    // Insertion Sort
    // [2, 5, 3, 1, 9, 6, 8, 7, 4]
    const insertionSort = (array) => {
        for (let i = 0; i < array.length; i++) {
            if (array[i] < array[0]) {
                array.splice(0, 0, array[i]);
                array.splice(i+1, 1);
            } else {
                for (let j = 1; j < i; j++) {
                    if (array[i] < array[j] && array[i] >= array[j-1]) {
                        array.splice(j, 0, array[i]);
                        array.splice(i+1, 1);
                    }
                }
            }
        }
        return array;
        // O(n^2); 
        // can be Ω(n) in almost sorted case;
    }

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
                return (merge(splitArray(leftArray), splitArray(rightArray)))
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

        return (splitArray(array));
        // O(NLogN)
    }


    
    return (
        <div>
            <h3>Sorting</h3>
        </div>
    )
};

export default Sorting;