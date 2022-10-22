import React from "react";

const LinkList = () => {
  class Node {
    constructor(value) {
      this.value = value;
      this.next = null;
      this.prev = null;
    }
  }

  class LinkList {
    constructor(value) {
      this.head = {
        value: value,
        next: null,
        prev: null,
      };
      this.tail = this.head;
      this.length = 1;
    }

    printList() {
      const array = [];
      let currentNode = this.head;
      while (currentNode != null) {
        array.push(currentNode.value);
        currentNode = currentNode.next;
      }
      return array;
      // O(n)
    }

    traverseToIndex(index) {
      let currentNode = this.head;
      for (let i = 0; i < index; i++) {
        currentNode = currentNode.next;
      }
      return currentNode;
      // O(n)
    }

    append(value) {
      const newNode = new Node(value);
      newNode.prev = this.tail;
      this.tail.next = newNode;
      this.tail = newNode;
      this.length++;
      return this;
      // O(1)
    }

    prepend(value) {
      const newNode = new Node(value);
      newNode.next = this.head;
      this.head.prev = newNode;
      this.head = newNode;
      this.length++;
      return this;
      // O(1)
    }

    insert(index, value) {
      if (index <= 0) {
        this.prepend(value);
        return this;
      }

      if (index > this.length - 1) {
        this.append(value);
        return this;
      }

      const newNode = new Node(value);
      let prevNode = this.traverseToIndex(index - 1);
      newNode.next = prevNode.next;
      prevNode.next.prev = newNode;
      prevNode.next = newNode;
      newNode.prev = prevNode;
      this.length++;
      return this;
      // O(n)
    }

    remove(index) {
      if (index < 0 || index > this.length - 1) {
        return;
      }
      if (index === 0) {
        this.head.next.prev = null;
        this.head = this.head.next;
      } else {
        let prevNode = this.traverseToIndex(index - 1);
        let unwantedNode = prevNode.next;
        if (unwantedNode.next) {
          unwantedNode.next.prev = prevNode;
          prevNode.next = unwantedNode.next;
        } else {
          this.tail = prevNode;
          prevNode.next = null;
        }
      }
      this.length--;
      return this;
      // O(n)
    }

    reverse() {
      // check the list item,
      // loop thought the linked list,
      // save value in a array;
      // create a new node,
      // replace the head,
      // prepend the list;
      const listLength = this.length;
      if (listLength <= 1) {
        return this;
      }
      const listValueArray = this.printList();
      let newNode = new Node(listValueArray[0]);
      this.head = newNode;
      this.tail = this.head;
      for (let i = 1; i < listLength; i++) {
        myLinkList.prepend(listValueArray[i]);
      }
      return this;
      // O(n)

      // const listLength = this.length;
      // for (let i = 0; i < listLength; i++) {
      //     // prepend(i.value)
      //     this.prepend(this.traverseToIndex(i).value);
      //     // remove(i+1)
      //     this.remove(i+1);
      // }
      // return this;
      // O(n^2)
    }
  }

  const myLinkList = new LinkList(10);
  myLinkList.append(5);
  myLinkList.append(9);
  myLinkList.prepend(2);
  myLinkList.insert(2, 8);
  myLinkList.remove(1);
  myLinkList.reverse();

  /* Reverse a link list */
  const reverse = (head) => {
    let current = head;
    let prev = null;

    while (current) {
      let next = current.next;
      current.next = prev;
      prev = current;
      current = next;
    }

    return prev;
    // T: O(n)
    // S: O(1)
  };

  /* M, N Reversals */
  const MNReversals = (head, m, n) => {
    // keep check of the position
    // current node
    // start
    // tail
    // reversed list
    let position = 1;
    let currentNode = head;
    let start = null;

    while (position < m) {
      start = currentNode;
      currentNode = currentNode.next;
      position++;
    }

    let tail = currentNode;
    let reversedList = null;

    while (position < n + 1) {
      let next = currentNode.next;
      currentNode.next = reversedList;
      reversedList = currentNode;
      currentNode = next;
      position++;
    }

    tail.next = currentNode;
    if (m > 1) {
      start.next = reversedList;
      return head;
    } else {
      return reversedList;
    }
  };

  /* Flatten a Multilevel Doubly Linked List */
  // bottom up solution
  const flattenLinkedList = (head) => {
    let currentNode = head;
    let track = [];

    if (!currentNode) {
      return head;
    }

    while (currentNode.next || currentNode.child || track.length > 0) {
      if (currentNode.child) {
        const newTrack = {
          start: currentNode,
          next: currentNode.next,
          child: currentNode.child,
        };
        track.push(newTrack);
        currentNode = currentNode.child;
      } else if (currentNode.next === null) {
        const index = track.length - 1;
        const tracked = track[index];
        tracked.start.next = tracked.child;
        tracked.child.prev = tracked.start;
        tracked.start.child = null;
        currentNode.next = tracked.next;
        if (tracked.next) {
          tracked.next.prev = currentNode;
          currentNode = currentNode.next;
        }
        track.pop();
      } else {
        currentNode = currentNode.next;
      }
    }
    return head;
  };

  // top down solution
  const flattenLinkedListTD = (head) => {
    let currentNode = head;

    if (!currentNode) {
      return head;
    }

    while (currentNode.next || currentNode.child) {
      if (currentNode.child) {
        let childNode = currentNode.child;
        while (childNode.next !== null) {
          childNode = childNode.next;
        }
        childNode.next = currentNode.next;
        if (childNode.next) {
          childNode.next.prev = childNode;
        }
        currentNode.next = currentNode.child;
        currentNode.child.prev = currentNode;
        currentNode.child = null;
      }
      currentNode = currentNode.next;
    }
    return head;
    // T: O(n)
    // S: O(1)
  };

  /* Cycle Detection */
  // basic solution
  const cycle = (head) => {
    if (!head) return null;
    let currentNode = head;
    let seenNodes = new Set();
    while (!seenNodes.has(currentNode)) {
      if (currentNode.next === null) {
        return null;
      }
      seenNodes.add(currentNode);
      currentNode = currentNode.next;
    }
    return currentNode;
    // T: O(n)
    // S: O(n)
  };

  // Floyd's tortoise and hare
  const floyd = (head) => {
    if (!head) return null;
    let tortoise = head;
    let hare = head;
    let meet = null;

    while (!meet) {
      tortoise = tortoise.next;
      hare = hare.next;
      if (hare === null || hare.next === null || hare.next.next === null) {
        return null;
      } else {
        hare = hare.next;
      }

      if (tortoise === hare) {
        meet = tortoise;
      }
    }

    tortoise = head;
    hare = meet;

    while (tortoise !== hare) {
      tortoise = tortoise.next;
      hare = hare.next;
    }

    return tortoise;
    // T: O(n)
    // S: O(1)
  };

  return (
    <div>
      <h3>LinkedList</h3>
      <h3>create a Doubly linked-list</h3>
      <div>{JSON.stringify(myLinkList.printList())}</div>
    </div>
  );
};

export default LinkList;
