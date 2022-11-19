import React from "react";

const DynamicProgramming = () => {
  const index = 20;

  let findFibonacciRecursionCounter = 0;
  const findFibonacciRecursion = (index) => {
    findFibonacciRecursionCounter++;
    if (index === 0) return 0;
    if (index === 1 || index === 2) return 1;
    return (
      findFibonacciRecursion(index - 1) + findFibonacciRecursion(index - 2)
    );
    // O(2^n)
  };

  let findFibonacciRecursionWithCacheCounter = 0;
  const findFibonacciRecursionWithCache = () => {
    const cache = {};
    return function findFibbonacci(index) {
      findFibonacciRecursionWithCacheCounter++;
      if (index in cache) {
        return cache[index];
      } else {
        if (index < 2) {
          return index;
        } else {
          cache[index] = findFibbonacci(index - 1) + findFibbonacci(index - 2);
          return cache[index];
        }
      }
      // O(n)
    };
  };
  const fastFib = findFibonacciRecursionWithCache();

  const fibonacciValue = findFibonacciRecursion(index);
  const fastFibValue = fastFib(index);
  return (
    <div>
      <h3>Dynamic Programming</h3>
      <p>
        Find Fibonacci Recursion index {index}: {fibonacciValue}
      </p>
      <h4>Opperation times Without Cache: {findFibonacciRecursionCounter}</h4>
      <p>------------</p>
      <p>
        Find Fibonacci Recursion index {index} with Cache: {fastFibValue}
      </p>
      <h4>
        Opperation Times With Cache: {findFibonacciRecursionWithCacheCounter}
      </h4>
    </div>
  );
};

export default DynamicProgramming;
