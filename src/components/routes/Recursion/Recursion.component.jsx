import React, { createFactory } from "react";

const Recursion = () => {
    // 1) Find Factoiral
    // 5 => 5*4*3*2*1
    const findFactorialRecursion = (value) => {
        if (value === 2) {
            return 2;
        }
        const factorial = value * findFactorialRecursion(value-1)
        return factorial;
        // O(n)
    }

    const findFactorialIterative = (value) => {
        let factorial = 1;
        if (value < 1) return 0;
        if (value === 1) return factorial;
        for (let i = 2; i <= value; i++) {
            factorial = factorial * i;
        }
        return factorial;
        // O(n)
    }

    // 2) Find Fibonacci Value
    // 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55...
    // findFibonacci(7) => 13
    const findFibonacciRecursion = (index) => {
        if (index === 0) return 0;
        if (index === 1 || index === 2) return 1;
        return (findFibonacciRecursion(index - 1) + findFibonacciRecursion(index - 2))
        // O(2^n)
    }

    const findFibonacciIterative = (index) => {
        if (index === 0) return 0;
        if (index === 1 || index === 2) return 1;
        let a = 0;
        let b = 1;
        let fibonacciValue = a + b;
        for (let i = 0; i < index - 2; i++) {
            a = b;
            b = fibonacciValue;
            fibonacciValue = a + b;
        }
        return fibonacciValue;
        // O(n)
    }

    return (
        <div>
            <h3>Recursion</h3>
        </div>
    )
}

export default Recursion;