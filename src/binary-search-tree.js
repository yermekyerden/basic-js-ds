const { NotImplementedError } = require('../lib/errors');
// const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}
class BinarySearchTree {
  constructor() {
    this._root = null;
  }

  root() {
    return this._root;
  }

  add(data) {
    const node = new Node(data);
    if (!this._root) {
      this._root = node;
      return;
    }

    let cur = this._root;
    while (true) {
      if (data === cur.data) return;

      if (data < cur.data) {
        if (cur.left) {
          cur = cur.left;
        } else {
          cur.left = node;
          return;
        }
      } else {
        if (cur.right) {
          cur = cur.right;
        } else {
          cur.right = node;
          return;
        }
      }
    }
  }

  find(data) {
    let cur = this._root;
    while (cur) {
      if (data === cur.data) return cur;

      cur = data < cur.data ? cur.left : cur.right;
    }

    return null;
  }

  has(data) {
    return !!this.find(data);
  }

  remove(data) {
    const removeNode = (node, value) => {
      if (!node) return null;

      if (value < node.data) {
        node.left = removeNode(node.left, value);
        return node;
      }

      if (value > node.data) {
        node.right = removeNode(node.right, value);
        return node;
      }

      if (!node.left && !node.right) return null;
      if (!node.left) return node.right;
      if (!node.right) return node.left;

      let minRight = node.right;
      while (minRight.left) minRight = minRight.left;
      node.data = minRight.data;
      node.right = removeNode(node.right, minRight.data);

      return node;
    };

    this._root = removeNode(this._root, data);
  }

  min() {
    if (!this._root) return null;

    let cur = this._root;
    while (cur.left) cur = cur.left;

    return cur.data;
  }

  max() {
    if (!this._root) return null;

    let cur = this._root;
    while (cur.right) cur = cur.right;

    return cur.data;
  }
}

module.exports = {
  BinarySearchTree
};
