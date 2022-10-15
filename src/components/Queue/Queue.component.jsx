import React from 'react';

const Queue = () => {
    class Node {
        constructor(value) {
            this.value = value;
            this.next = null;
        }
    }

    class Queue {
        constructor() {
            this.first = null;
            this.last = null;
            this.length = 0;
        }

        peek() {
            return this.first.value;
            // O(1);
        }

        enqueue(value) {
            const newNode = new Node(value);
            if (this.length === 0) {
                this.first = newNode;
                this.last = newNode;
            } else {
                this.last.next = newNode;
                this.last = newNode;                
            }
            this.length ++;
            return this;
            // O(1)
        }

        dequeue() {
            if (this.length <= 1) {
                this.first = null;
                this.last = null;
                this.length = 0;
            } else {
                this.first = this.first.next;
                this.length --;
            }
            return this;
        }

    }

    const myQueue = new Queue();
    myQueue.enqueue("Steven");
    myQueue.enqueue("David");
    myQueue.enqueue("Joy");
    myQueue.dequeue();


    return (
        <div>
            <h3>Queue</h3>
            <p>{JSON.stringify(myQueue)}</p>
            <p>{myQueue.length !== 0 ? `The first item: ${JSON.stringify(myQueue.peek())}` : "Thst's not good"}</p>
        </div>
    )
}

export default Queue