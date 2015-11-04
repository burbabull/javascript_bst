"use strict";
function Node (left, right, key, value) {
  this.left = left;
  this.right = right;
  this.key = key;
  this.value = value;
  this.parent = null;
};

Node.prototype.find = function (key) {
  if (key === this.key) {
    var retval = this;
    console.log("Retval is %d %d ", retval.key, retval.value);
    return retval;
  }
  if (key < this.key) {
    return this.left.find(key);
  }
  if (key > this.key) {
    return this.right.find(key);
  }
};

Node.prototype.insert = function (node) {
  console.log("into " + this.key);
  if (node.key < this.key) {
    if (this.left === null) {
      this.left = node;
      node.parent = this;
    }
    else {
       this.left.insert(node);
    }
  }
  if (node.key > this.key) {
    if (this.right === null) {
      this.right = node;
      node.parent = this;
    }
    else {
      this.right.insert(node);
    }
  }
  if (node.key === this.key) {
    throw new Error("Can't insert item of equal key!!! " + this.key + "  " + node.key);
  }
};

/**
 * Find the smallest thing in the right subtree
 */
Node.prototype.successor = function (key) {
  if (this.right === null) return null;
  else {
    var cur = this.right;
    while (cur.left != null) {
      cur = cur.left;
    }
    return cur;
  }
};

Node.prototype.bstDelete = function (key) {
  var target = this.find(key);
  console.log("Deleting from " + this.value);
  //the item is not in the tree... mission accomplished!
  if (target === null) return true;
  //the item is a leaf
  if (!target.left && !target.right) {
    (target === target.parent.left) ? target.parent.left = null : target.parent.right = null;
    return true;
  }
  //the item has a left subchild
  if (target.left && !target.right) {
    if (target === target.parent.left) {
      target.parent.left = target.left;
    }
    else {
      target.parent.right = target.left;
    }
    target.left.parent = target.parent;
    return true;
  }
  //the item has a right subchild
  if (!target.left && target.right) {
    if (target === target.parent.left) {
      target.parent.left = target.right;
    }
    else {
      target.parent.right = target.right;
    }
    target.right.parent = target.parent;
    return true;
  }
  //the item has both children
  else {
    var successor = target.successor();
    (target === target.parent.left) ? 
      target.parent.left = successor :
      target.parent.right = successor;
    successor.left = target.left;
    successor.right = target.right;
    target.left.parent = successor;
    target.right.parent = successor;
    return true;
  }
};

Node.prototype.preorderTraversal = function () {
  console.log("%s : %s", this.key, this.value);
  this.left && this.left.preorderTraversal();
  this.right && this.right.preorderTraversal();
};

Node.prototype.inorderTraversal = function () {
  this.left && this.left.inorderTraversal();
  console.log("%s : %s", this.key, this.value);
  this.right && this.right.inorderTraversal();
};

Node.prototype.postorderTraversal = function () {
  this.left && this.left.postorderTraversal();
  this.right && this.right.postorderTraversal();
  console.log("%s : %s", this.key, this.value);
};


var root = new Node(null, null, 5, 'root');
(function () {
  var inserts = [9,4,3,6,1,2,8,7];
  inserts.forEach(function (ins) {
    console.log("Inserting " + ins);
    root.insert(new Node(null, null, ins, ins));
  });
  var k = root.bstDelete(4);
}());
