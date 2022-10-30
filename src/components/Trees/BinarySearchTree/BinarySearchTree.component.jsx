import React from "react";

const BinarySearchTree = () => {
  class Node {
    constructor(value) {
      this.value = value;
      this.left = null;
      this.right = null;
    }
  }

  class BinarySearchTree {
    constructor() {
      this.root = null;
    }

    insert(value) {
      const newNode = new Node(value);
      if (this.root == null) {
        this.root = newNode;
        return this;
      } else {
        let currentNode = this.root;
        while (
          !(currentNode.left === newNode || currentNode.right === newNode)
        ) {
          if (newNode.value < currentNode.value) {
            if (currentNode.left == null) {
              currentNode.left = newNode;
            } else {
              currentNode = currentNode.left;
            }
          } else if (newNode.value > currentNode.value) {
            if (currentNode.right == null) {
              currentNode.right = newNode;
            } else {
              currentNode = currentNode.right;
            }
          }
        }
      }
      return this;
    }

    lookup(value) {
      if (this.root == null) {
        return null;
      }
      let currentNode = this.root;
      while (currentNode !== null && currentNode.value !== value) {
        if (value < currentNode.value) {
          currentNode = currentNode.left;
        } else if (value > currentNode.value) {
          currentNode = currentNode.right;
        }
      }
      return currentNode;
    }

    remove(value) {
      if (this.root == null) {
        return null;
      }
      let currentNode = this.root;
      if (value === currentNode.value) {
        this.root = null;
        return this;
      }

      let prevNode = null;

      // locate the unwanted node
      while (currentNode !== null && currentNode.value !== value) {
        if (value < currentNode.value) {
          prevNode = currentNode;
          currentNode = currentNode.left;
        } else if (value > currentNode.value) {
          prevNode = currentNode;
          currentNode = currentNode.right;
        }
      }

      // case 1: if value not in tree
      if (currentNode == null) {
        return this;
      }

      // case 2: if node == leaf
      if (currentNode.left == null && currentNode.right == null) {
        currentNode = null;
        return this;
      }

      // case 3: if node has only one child
      if (currentNode.left == null) {
        if (prevNode.left === currentNode) {
          prevNode.left = currentNode.right;
        } else if (prevNode.right === currentNode) {
          prevNode.right = currentNode.right;
        }
        return this;
      }
      if (currentNode.right == null) {
        if (prevNode.left === currentNode) {
          prevNode.left = currentNode.left;
        } else if (prevNode.right === currentNode) {
          prevNode.right = currentNode.left;
        }
        return this;
      }

      // case 4: if node has both left and right child, replace node by the the successor which is the smallest value node of the right
      let successor = currentNode.right;
      let prevSuccessor = null;
      // locate the successor
      while (successor.left !== null) {
        prevSuccessor = successor;
        successor = successor.left;
      }
      // 1. connect the right child of successor with the prevSuccessor
      prevSuccessor.left = successor.right;
      // 2. connect the unwanted node child to the successor
      successor.left = currentNode.left;
      successor.right = currentNode.right;
      // 3. connect prevNode to successor
      if (prevNode.left === currentNode) {
        prevNode.left = successor;
      } else if (prevNode.right === currentNode) {
        prevNode.right = successor;
      }
      return this;
    }

    // Breath First Search
    breathFirstSearch() {
      let currentNode = this.root;
      const list = [];
      const queue = [];
      queue.push(currentNode);

      while (queue.length > 0) {
        currentNode = queue.shift();
        list.push(currentNode.value);
        if (currentNode.left) {
          queue.push(currentNode.left);
        }
        if (currentNode.right) {
          queue.push(currentNode.right);
        }
      }
      return list;
    }
  }

  function traverse(node) {
    const tree = { value: node.value };
    tree.left = node.left == null ? null : traverse(node.left);
    tree.right = node.right == null ? null : traverse(node.right);
    return tree;
  }

  // Depth First Search
  // in-order DFS
  function depthFirstSearchInOrder(node, list) {
    if (node.left) {
      depthFirstSearchInOrder(node.left, list);
    }
    list.push(node.value);
    if (node.right) {
      depthFirstSearchInOrder(node.right, list);
    }
    return list;
  }

  // pre-order DFS
  function depthFirstSearchPreOrder(node, list) {
    list.push(node.value);
    if (node.left) {
      depthFirstSearchPreOrder(node.left, list);
    }
    if (node.right) {
      depthFirstSearchPreOrder(node.right, list);
    }
    return list;
  }

  // post-order DFS
  function depthFirstSearchPostOrder(node, list) {
    if (node.left) {
      depthFirstSearchPostOrder(node.left, list);
    }
    if (node.right) {
      depthFirstSearchPostOrder(node.right, list);
    }
    list.push(node.value);
    return list;
  }

  const myTree = new BinarySearchTree();
  myTree.insert(50);
  myTree.insert(20);
  myTree.insert(80);
  myTree.insert(10);
  myTree.insert(30);
  myTree.insert(26);
  myTree.insert(40);
  myTree.insert(60);
  myTree.insert(90);
  myTree.insert(22);
  myTree.insert(28);
  myTree.insert(25);
  myTree.insert(100);

  myTree.remove(20);

  const lookup = myTree.lookup(26);
  const BFS = myTree.breathFirstSearch();
  const inOrderDFS = depthFirstSearchInOrder(myTree.root, []);
  const preOrderDFS = depthFirstSearchPreOrder(myTree.root, []);
  const postOrderDFS = depthFirstSearchPostOrder(myTree.root, []);

  /* Maximum Depth of Binary Tree */
  const recursionSearch = (currentNode, count) => {
    if (currentNode.left === null && currentNode.right === null) {
      return count;
    }

    let leftCount = count;
    if (currentNode.left) {
      leftCount = recursionSearch(currentNode.left, leftCount + 1);
    }
    let rightCount = count;
    if (currentNode.right) {
      rightCount = recursionSearch(currentNode.right, rightCount + 1);
    }
    return Math.max(leftCount, rightCount);
  };

  const maxDepth = (root) => {
    if (!root) return 0;
    let count = 1;
    return recursionSearch(root, count);
    // T: O(n);
    // S: O(n);
  };

  /* Binary Tree Level Order Traversal */
  const treeLevel = (root) => {
    if (!root) return [];
    const res = [];
    const q = [root];
    while (q.length) {
      let nodeNum = q.length;
      let currentNum = 0;
      const subValues = [];

      while (currentNum < nodeNum) {
        const newNode = q.shift();
        subValues.push(newNode.value);
        if (newNode.left) {
          q.push(newNode.left);
        }
        if (newNode.right) {
          q.push(newNode.right);
        }
        currentNum++;
      }
      res.push(subValues);
    }
    return res;
    // T: O(n);
    // S: O(n);
  };

  /* Binary Tree Right Side View */
  // BFS
  const BFSRightSideView = (root) => {
    if (!root) return [];
    const res = [];
    const q = [root];
    while (q.length) {
      let nodeNum = q.length;
      let current = 0;
      while (current < nodeNum) {
        const newNode = q.shift();
        if (newNode.left) {
          q.push(newNode.left);
        }
        if (newNode.right) {
          q.push(newNode.right);
        }
        current++;
        if (current === nodeNum) {
          res.push(newNode.val);
        }
      }
      nodeNum = q.length;
    }
    return res;
    // T: O(n);
    // S: O(w)
  };

  // DFS
  const recursionRightSideView = (node, level, res) => {
    if (level >= res.length) {
      res.push(node.val);
    }

    if (node.left === null && node.right === null) {
      return;
    } else {
      if (node.right) {
        recursionRightSideView(node.right, level + 1, res);
      }
      if (node.left) {
        recursionRightSideView(node.left, level + 1, res);
      }
    }
    return;
  };

  const DFSRightSideView = (root) => {
    if (!root) return [];
    const res = [];
    recursionRightSideView(root, 0, res);
    return res;
    // T: O(n);
    // S: O(h);
  };

  /* Count Complete Tree Nodes */
  // get the height of the tree
  const getHeight = (currentNode, level) => {
    if (currentNode.left === null) {
      return level;
    }
    level++;
    return getHeight(currentNode.left, level);
  };

  // check if a node exists
  const checkNode = (currentNode, nodeIndex, left, right) => {
    if (left === right) {
      if (currentNode) {
        return true;
      } else {
        return false;
      }
    }
    const mid = Math.ceil((right + left) / 2);
    if (nodeIndex < mid) {
      return checkNode(currentNode.left, nodeIndex, left, mid - 1);
    }
    if (nodeIndex >= mid) {
      return checkNode(currentNode.right, nodeIndex, mid, right);
    }
  };

  // count bottom level nodes
  const countBottom = (root, last, left, right, maxNum) => {
    if (left === right) {
      return last;
    }
    let nodeIndex = Math.ceil((right + left) / 2);
    const isExist = checkNode(root, nodeIndex, 0, maxNum);
    if (isExist) {
      last = nodeIndex;
      return countBottom(root, last, nodeIndex, right, maxNum);
    } else {
      return countBottom(root, last, left, nodeIndex - 1, maxNum);
    }
  };

  const countNodes = (root) => {
    if (!root) return 0;
    // count the upper part
    const h = getHeight(root, 1);
    const upperNodes = 2 ** (h - 1) - 1;

    // count the bottom level
    let left = 0;
    let right = upperNodes;
    let last = 0;
    last = countBottom(root, last, left, right, upperNodes);

    return upperNodes + last + 1;
    // T: O(logn * logn)
    // S: O(1)
  };

  /* Validate Binary Search Tree */
  const recursionBST = (currentNode, lesser, greater) => {
    if (currentNode.val <= lesser || currentNode.val >= greater) {
      return false;
    }
    if (currentNode.left) {
      if (!recursionBST(currentNode.left, lesser, currentNode.val)) {
        return false;
      }
    }
    if (currentNode.right) {
      if (!recursionBST(currentNode.right, currentNode.val, greater)) {
        return false;
      }
    }
    return true;
  };

  const isValidBST = (root) => {
    if (!root) return true;
    return recursionBST(root, -Infinity, Infinity);
    // T: O(n);
    // S: O(n);
  };

  return (
    <div>
      <h3>BinarySearchTree</h3>
      <p>
        {myTree.root
          ? JSON.stringify(traverse(myTree.root))
          : "That's not good"}
      </p>
      <p>{lookup ? JSON.stringify(lookup) : "number not found"}</p>
      <p>---------------------</p>
      <h3>Breath First Search</h3>
      <p>{BFS ? JSON.stringify(BFS) : "Something wrong!"}</p>
      <h3>Depth First Search</h3>
      <p>In-Order DFS: {JSON.stringify(inOrderDFS)}</p>
      <p>Pre-Order DFS: {JSON.stringify(preOrderDFS)}</p>
      <p>Post-Order DFS: {JSON.stringify(postOrderDFS)}</p>
    </div>
  );
};

export default BinarySearchTree;
