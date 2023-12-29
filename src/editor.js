const LinkedList = require("./lib/linkedList");
const Node = require("./lib/node");

class Editor {
  /**
   * Constructs a new Editor object with the given text.
   * Defaults to empty text. Cursor is positioned at the end of the text.
   * @param {LinkedList} text - A linked List containing the characters that are in the editor,
   * empty by default
   */
  constructor(text = new LinkedList()) {
    this.text = text;
    this.cursor = this.text.find(
      (node, index) => index === this.text.length - 1
    );
  }

  /**
   * Insert a character at the cursor position of the editor.
   * @param {*} char a value to be inserted into the editor
   * @returns {Editor} a reference to this editor
   */
  insert(char) {
    // new node that points to original's pointing to
    // original node points to new node
    
    // if cursor not in editor or editor is empty
    if(!this.cursor || this.text.length === 0) {
      let tempNext = this.text.head;
      this.text.head = new Node(char);
      this.text.head.next = tempNext;
      this.cursor = this.text.head;
    } else {
      let newNode = new Node(char);
      let tempNext = this.cursor.next;
      this.cursor.next = newNode;
      newNode.next = tempNext;
      this.cursor = newNode;
    }
    return this;
  }

  /**
   * Remove the character at the cursor position.
   * Moves the cursor to the previous position.
   * If editor is empty does nothing.
   * @returns {Editor} a reference to this editor
   */
  delete() {
    // if empty
    if (this.text.head == null || this.cursor == null) {
      return this;
    }
    
    // if deleting first character
    if (this.cursor == this.text.head) {
      this.cursor = null;
      this.text.head = this.text.head.next;
      return this;
    }
    
    
    let current = this.cursor;
    let prev = this.text.head;
    while (prev.next != current) {
      prev = prev.next;
    }
    prev.next = current.next;
    this.cursor = prev;
    return this;
  }

  /**
   * Moves the cursor one position to the left.
   * If the cursor is at the start of the editor nothing happens.
   * @returns {Editor} a reference to this editor
   */
  arrowLeft() {
    if (this.cursor == this.text.head) {
      this.cursor = null;
    } else if (this.cursor != null && this.text.length) {
      let prev = this.text.head;
      while (prev.next != this.cursor) {
        prev = prev.next;
      }
      this.cursor = prev;
    }
    return this;
  }

  /**
   * Moves the cursor one position to the right.
   * If the cursor is at the end of the editor nothing happens.
   * @returns {Editor} a reference t this editor
   */
  arrowRight() {
    if (this.text.length == 0) {
      return this;
    }
    else if (this.cursor === null) {
      this.cursor = this.text.head;
    }
    else if (this.cursor.next != null) {
      this.cursor = this.cursor.next;
    }
    return this;
  }
}

module.exports = Editor;
