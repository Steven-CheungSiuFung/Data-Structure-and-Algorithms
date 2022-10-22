import React from "react";

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
      this.length++;
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
        this.length--;
      }
      return this;
    }
  }

  const myQueue = new Queue();
  myQueue.enqueue("Steven");
  myQueue.enqueue("David");
  myQueue.enqueue("Joy");
  myQueue.dequeue();

  class QueueByStack {
    constructor() {
      this.stack1 = [];
      this.stack2 = [];
    }

    enqueue(value) {
      this.stack1.push(value);
    }
    // O(1)

    dequeue() {
      if (this.stack2.length === 0) {
        while (this.stack1.length) {
          this.stack2.push(this.stack1.pop());
        }
      }
      return this.stack2.pop();
    }
    // O(n)

    peek() {
      if (this.stack2.length > 0) {
        const lastIndex = this.stack2.length - 1;
        return this.stack2[lastIndex];
      } else {
        if (this.stack1.length > 0) {
          return this.stack1[0];
        } else {
          return null;
        }
      }
    }
    // O(1)

    empty() {
      if (this.stack1.length === 0 && this.stack2.length === 0) {
        return true;
      } else {
        return false;
      }
    }
    // O(1)
  }

  return (
    <div>
      <h3>Queue</h3>
      <p>{JSON.stringify(myQueue)}</p>
      <p>
        {myQueue.length !== 0
          ? `The first item: ${JSON.stringify(myQueue.peek())}`
          : "Thst's not good"}
      </p>
    </div>
  );
};

export default Queue;
