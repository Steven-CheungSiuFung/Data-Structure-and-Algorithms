import React from 'react'

const HashTable = () => {

    // given array [1,2,5,3,2,6,1,5]
    // return 2

    // loop thought the array, add to a set
    // if exist in set, return the character

    const arrayData = [1,2,5,3,2,6,9,7];

    const checkRecurring = (array) => {
        const keys = {};
        for (let i = 0; i < array.length; i++) {
            if (keys[array[i]]) {
                return array[i];
            } else if (!keys[array[i]]) {
                keys[array[i]] = 1;
            }
        }
        return "that's not good";
        // O(n)
    }

    return (
        <div>
            <h3>HashTable</h3>
            <h3>First Recurring Character</h3>
            <p>Given an array: {JSON.stringify(arrayData)}</p>
            <p>The first recurring number is: {JSON.stringify(checkRecurring(arrayData))}</p>
        </div>
    )
}

export default HashTable