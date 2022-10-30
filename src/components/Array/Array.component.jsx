import React, { useState } from "react";

const Array = () => {
  const [inputValue, setInputValue] = useState("");
  const [outputString, setOutputString] = useState("");

  const handleChange = (event) => {
    event.preventDefault();
    const newValue = event.target.value;
    setInputValue(newValue);
  };

  /* Reverse String */
  const reverseString = () => {
    // first of all, chack the input
    // a string is a array of char
    // "Hi, My Name Is Steven" ==> ["H", "i", ",", " ", "M", "y", ......]
    // one solution is to loop thought the array from index stringArray.lenth - 1, to index 0
    // push the char to a new array
    if (!inputValue || inputValue.length < 2 || typeof string != "string") {
      setOutputString("That is not good");
    }

    const reversedString = [];

    for (var i = inputValue.length - 1; i >= 0; i--) {
      reversedString.push(inputValue[i]);
    }
    setOutputString(reversedString.join(""));
    // The Big O of this solution is O(n)
  };

  /* Marge Sorted Array */
  const array1 = [1, 3, 5, 7];
  const array2 = [2, 4, 6, 8, 10, 12];

  const margeSortedArray = (array1, array2) => {
    // chack the input
    if (array1.length === 0 || !array2) {
      return array1;
    }
    if (array2.length === 0 || !array1) {
      return array2;
    }
    // compare the first index of each array,
    // if array1[i] < array2[j] or j == array2.length
    // push array1[i] to newArray, i++, compare index [i+1] with [j]
    // else if array2[j] < array1[i] or i == array1.length
    // push array2[j] to newArray, j++, compare index [i] with [j+1]
    // until newArray.length = array1.length + array2.length
    const margedArray = [];
    let i = 0;
    let j = 0;
    while (margedArray.length !== array1.length + array2.length) {
      if (array1[i] < array2[j] || j === array2.length) {
        margedArray.push(array1[i]);
        i++;
      } else if (array2[j] < array1[i] || i === array1.length) {
        margedArray.push(array2[j]);
        j++;
      }
    }
    return margedArray;
    // The Big O of this solution is O(a + b)
  };

  /* Two Sum  */
  const twoSumArray = [1, 3, 6, 9, 2];
  const twoSumTarget = 11;

  // two pointer tech
  const twoSum = (twoSumArray, twoSumTarget) => {
    // start from: p1 = array[i = 0]; p2 = array[j = i + 1];
    // number to find == target - p1;
    // if p2 == number to find => return [p1, p2]; else j++;

    for (let i = 0; i < twoSumArray.length; i++) {
      for (let j = i + 1; j < twoSumArray.length; j++) {
        if (twoSumArray[i] + twoSumArray[j] === twoSumTarget) {
          return [i, j];
        }
      }
    }

    return [];
    // O(n^2) , which is not good
  };

  // hash table
  const twoSumHash = (twoSumArray, twoSumTarget) => {
    // store number to find in a hash table
    // compare the number with the hash table

    const hashTable = {};

    for (let i = 0; i < twoSumArray.length; i++) {
      if (hashTable[twoSumArray[i]] >= 0) {
        return [hashTable[twoSumArray[i]], i];
      } else {
        const numberToFind = twoSumTarget - twoSumArray[i];
        hashTable[numberToFind] = i;
      }
    }

    return [];
    // O(n);
  };

  /* Container with most water */
  const containerArray = [1, 8, 6, 2, 5, 4, 8, 3, 7];

  // two pointer shift tech
  const container = (array) => {
    let maxArea = 0;
    let p1 = 0;
    let p2 = array.length - 1;

    while (p1 !== p2) {
      let area = Math.min(array[p1], array[p2]) * (p2 - p1);
      if (area > maxArea) {
        maxArea = area;
      }
      if (array[p1] <= array[p2]) {
        p1++;
      } else if (array[p1] > array[p2]) {
        p2--;
      }
    }
    return maxArea;
    // O(n)
  };

  /* Trapping Rainwater */
  const rainwaterArray = [0, 1, 0, 2, 1, 0, 3, 1, 0, 1, 2];

  // basic solution
  const rainwater = (height) => {
    let totalWater = 0;
    for (let i = 0; i < height.length; i++) {
      let maxL = 0;
      let maxR = 0;
      for (let j = i - 1; j >= 0; j--) {
        if (height[j] > maxL) {
          maxL = height[j];
        }
      }
      for (let j = i + 1; j < height.length; j++) {
        if (height[j] > maxR) {
          maxR = height[j];
        }
      }
      const currentWater = Math.min(maxL, maxR) - height[i];
      if (currentWater > 0) {
        totalWater = totalWater + currentWater;
      }
    }
    return totalWater;
    // O(n^2)
  };

  // two pointer shift solution
  const twoPointerTrap = (height) => {
    let pLeft = 0;
    let pRight = height.length - 1;

    let totalWater = 0;
    let maxLeft = 0;
    let maxRight = 0;

    while (pLeft !== pRight) {
      if (height[pLeft] <= height[pRight]) {
        if (maxLeft > height[pLeft]) {
          const currentWater = maxLeft - height[pLeft];
          totalWater += currentWater;
        } else {
          maxLeft = height[pLeft];
        }
        pLeft++;
      } else {
        if (maxRight > height[pRight]) {
          const currentWater = maxRight - height[pRight];
          totalWater += currentWater;
        } else {
          maxRight = height[pRight];
        }
        pRight--;
      }
    }
    return totalWater;
    // O(n)
  };

  /* Backspace string */

  const stringS = "ab#z";
  const stringT = "ac#z";

  // basic solution
  // helper function 1
  const getFinalString = (str) => {
    const newString = [];
    for (let i = 0; i < str.length; i++) {
      if (str[i] === "#") {
        newString.pop();
      } else {
        newString.push(str[i]);
      }
    }
    return newString;
  };

  // helper function 2
  const compareString = (S, T) => {
    if (S.length !== T.length) {
      return false;
    }

    for (let i = 0; i < S.length; i++) {
      if (S[i] !== T[i]) {
        return false;
      }
    }
    return true;
  };

  const typedOutString = (S, T) => {
    const finalS = getFinalString(S);
    const finalT = getFinalString(T);
    return compareString(finalS, finalT);
    // T: O(a+b)
    // S: O(a+b)
  };

  // two pointer shift
  const twoPointerBackspace = (S, T) => {
    let p1 = S.length - 1;
    let p2 = T.length - 1;

    let h1 = 0;
    let h2 = 0;

    while (p1 >= 0 || p2 >= 0) {
      if (S[p1] === "#") {
        h1 += 1;
        p1 -= 1;
      } else if (T[p2] === "#") {
        h2 += 1;
        p2 -= 1;
      } else if (h1 > 0) {
        h1 -= 1;
        p1 -= 1;
      } else if (h2 > 0) {
        h2 -= 1;
        p2 -= 1;
      } else if (S[p1] !== T[p2]) {
        return false;
      } else {
        p1 -= 1;
        p2 -= 1;
      }
    }
    return true;
    // T: O(a+b)
    // S: O(1)
  };

  /* Length of substring */

  const stringOfLOS = "abcdbah";

  // basic solution
  const findSubstring = (s) => {
    let maxLengthOfSubstring = 0;
    let currentStringLength = 0;
    let dict = {};
    for (let i = 0; i < s.length; i++) {
      currentStringLength = 1;
      dict = {};
      dict[s[i]] = 1;
      let j = i + 1;
      while (j < s.length) {
        if (!dict[s[j]]) {
          dict[s[j]] = 1;
          currentStringLength++;
          j++;
        } else {
          j = s.length;
        }
      }
      if (currentStringLength > maxLengthOfSubstring) {
        maxLengthOfSubstring = currentStringLength;
      }
    }
    return maxLengthOfSubstring;
    // T: O(n^2)
    // S: O(n)
  };

  // slining Window Tech
  const slidingWindow = (s) => {
    let maxLengthOfSubstring = 0;
    let p1 = 0;
    let dict = {};

    for (let p2 = 0; p2 < s.length; p2++) {
      if (dict[s[p2]] >= p1) {
        p1 = dict[s[p2]] + 1;
      }
      dict[s[p2]] = p2;
      maxLengthOfSubstring = Math.max(maxLengthOfSubstring, p2 - p1 + 1);
    }
    return maxLengthOfSubstring;
    // T: O(n)
    // S: O(n)
  };

  /* Palindrome */
  const palindromeS = "A man, a plan, a canal: Panama";

  // Pointers start from the first and last index of the string
  const isPalindromeFL = (s) => {
    s = s.replace(/[^A-Za-z0-9]/g, "").toLowerCase();

    let p1 = 0;
    let p2 = s.length - 1;

    while (p1 < p2) {
      if (s[p1] !== s[p2]) {
        return false;
      }
      p1++;
      p2--;
    }
    return true;
  };

  // Pointers start from the middle of the string
  const isPalindromeM = (s) => {
    s = s.replace(/[^A-Za-z0-9]/g, "").toLowerCase();

    const length = s.length;
    let p1 = length % 2 === 0 ? length / 2 - 1 : Math.floor(length / 2);
    let p2 = length % 2 === 0 ? length / 2 : Math.floor(length / 2);

    while (p1 >= 0) {
      if (s[p1] !== s[p2]) {
        return false;
      }
      p1--;
      p2++;
    }
    return true;
  };

  // Pointers start from first index of the string, and the reversed string
  const isPalindromeR = (s) => {
    s = s.replace(/[^A-Za-z0-9]/g, "").toLowerCase();
    const r = [];
    for (let i = s.length - 1; i >= 0; i--) {
      r.push(s[i]);
    }
    for (let p = 0; p < s.length; p++) {
      if (s[p] !== r[p]) {
        return false;
      }
    }
    return true;
  };

  /* Is palindrome after remove one letter */
  const almostPalindromeString = "abcdedfcba";

  // a helper function
  const validSubpalindrome = (s, p1, p2) => {
    while (p1 < p2) {
      if (s[p1] !== s[p2]) {
        return false;
      }
      p1++;
      p2--;
    }
    return true;
  };

  const almostPalindrome = (s) => {
    s = s.replace(/[^A-Za-z0-9]/g, "").toLowerCase();
    let p1 = 0;
    let p2 = s.length - 1;

    while (p1 < p2) {
      if (s[p1] !== s[p2]) {
        if (s[p1 + 1] !== s[p2] && s[p1] !== s[p2 - 1]) {
          return false;
        }
        return (
          validSubpalindrome(s, p1 + 1, p2) || validSubpalindrome(s, p1, p2 - 1)
        );
      }
      p1++;
      p2--;
    }
    return true;
    // T: O(n)
    // S: O(1)
  };

  /* Anagram */
  const str1 = "abcdefgg";
  const str2 = "ggfedcba";
  const hash1 = {};
  const hash2 = {};

  const anagram = (string1, string2) => {
    for (const char of string1) {
      hash1[char] ? (hash1[char] += 1) : (hash1[char] = 1);
    }

    for (const char of string2) {
      hash2[char] ? (hash2[char] += 1) : (hash2[char] = 1);
    }

    for (const key in hash1) {
      if (!hash2[key]) {
        return false;
      }
      if (hash1[key] !== hash2[key]) {
        return false;
      }
    }
    return true;
  };

  /* Find First and Last Position of Element in Sorted Array */

  const binarySearch = (nums, target, left, right) => {
    while (left <= right) {
      let mid = Math.floor((right + left) / 2);
      if (nums[mid] === target) {
        return mid;
      } else if (nums[mid] > target) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    }
    return -1;
  };

  const findStartAndEndIndex = (nums, target) => {
    let left = 0;
    let right = nums.length - 1;
    const firstPosition = binarySearch(nums, target, left, right);
    if (firstPosition === -1) return [-1, -1];
    let temp1 = firstPosition;
    let start = firstPosition;
    while (start !== -1) {
      temp1 = start;
      start--;
      start = binarySearch(nums, target, 0, start);
    }
    let temp2 = firstPosition;
    let end = firstPosition;
    while (end !== -1) {
      temp2 = end;
      end++;
      end = binarySearch(nums, target, end, right);
    }
    return [temp1, temp2];
  };

  return (
    <div>
      <h3>Array</h3>
      <h3>create a function to reverse a string</h3>
      <input
        type="text"
        name="input-string"
        value={inputValue}
        onChange={handleChange}
        placeholder="Enter a string"
      />
      <button onClick={reverseString}>Convert</button>
      <p>Reversed String: {outputString}</p>

      <h3>marge two sorted array into one sorted array</h3>
      <p>
        Given two arrray: {JSON.stringify(array1)} and {JSON.stringify(array2)}
      </p>
      <p>
        The marged array is: {JSON.stringify(margeSortedArray(array1, array2))}
      </p>

      <h3>Two Sum (Hash Table)</h3>
      <p>
        Given a array: {JSON.stringify(twoSumArray)}, return the index of two
        numbers that add up to the target number: {twoSumTarget}
      </p>
      <p>
        The result is: {JSON.stringify(twoSumHash(twoSumArray, twoSumTarget))}
      </p>
      <h3>Container With Most Water (Two Pointer Shift)</h3>
      <p>Given a array: {JSON.stringify(containerArray)}</p>
      <p>The result is: {container(containerArray)}</p>
      <h3>Trapping Rain Water (Two Pointer Shift)</h3>
      <p>Given a array: {JSON.stringify(rainwaterArray)}</p>
      <p>The result is: {twoPointerTrap(rainwaterArray)}</p>
      <h3>Backspace String (Two Pointer Shift)</h3>
      <p>
        Given Two String: {stringS} and {stringT}
      </p>
      <p>
        The result is: {JSON.stringify(twoPointerBackspace(stringS, stringT))}
      </p>
      <h3>Longest Substring (Sliding Window)</h3>
      <p>Given a string: {stringOfLOS}, find the longest substring length</p>
      <p>The result is: {slidingWindow(stringOfLOS)}</p>
      <h3>Is Palindrome after remove one letter (3 way to check palindrome)</h3>
      <p>Given a string: {almostPalindromeString}</p>
      <p>
        The result is:{" "}
        {JSON.stringify(almostPalindrome(almostPalindromeString))}
      </p>
      <h3>Frequency Counter Pattern</h3>
      <p>
        Given two arrray: {JSON.stringify(str1)} and {JSON.stringify(str2)}
      </p>
      <p>The result is: {anagram(str1, str2) ? "true" : "false"}</p>
      <p>The count of first string: {JSON.stringify(hash1)}</p>
      <p>The count of second string: {JSON.stringify(hash2)}</p>
    </div>
  );
};

export default Array;
