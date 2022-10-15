import React from 'react'

const Stack = () => {

    class Node {
        constructor(value) {
            this.value = value;
            this.next = null;
        }
    }

    class Stack {
        constructor() {
            this.top = null;
            this.bottom = null;
            this.length = 0;
        }

        printStack() {
            const stackArray = [];
            let currentNode = this.top;
            for (let i = 0; i < this.length; i++) {
                stackArray.push(currentNode.value);
                currentNode = currentNode.next;
            }
            return stackArray;
            // O(n)
        }

        push(value) {
            const newNode = new Node(value);
            if (this.length === 0) {
                this.top = newNode;
                this.bottom = newNode;
            } else {
                newNode.next = this.top;
                this.top = newNode;
            }
            this.length ++;
            return this;
            // O(1)
        }

        peek() {
            return this.top.value;
            // O(1)
        }

        pop() {
            if (this.length <= 1) {
                this.top = null;
                this.bottom = null;
                this.length = 0;
                return this;
            }
            this.top = this.top.next;
            this.length --;
            return this;
            // O(1);
        }
    }

    const myStack = new Stack();
    myStack.push("Udemy");
    myStack.push("Google");
    myStack.push("YouTube");
    myStack.pop();
    // myStack.printStack();
    // myStack.peek();

    return (
        <div>
            <h3>Stack</h3>
            <p>{myStack.length !== 0 ? `The values in myStack: ${JSON.stringify(myStack.printStack())}` : "That's not good"}</p>
            <p>{myStack.length !== 0 ? `The value in the top: ${JSON.stringify(myStack.peek())}` : "That's not good"}</p>
        </div>
    )
}

export default Stack