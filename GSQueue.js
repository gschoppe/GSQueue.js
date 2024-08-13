/**
 * @module GSQueue.js
 * @author Greg Schoppe <contact@gschoppe.com>
 * @copyright 2024
 * @license MIT
 */

/**
 * @class
 * @classdesc A queue implementation with O(1) enqueue and O(1) dequeue.
 */
export class GSQueue {
  /** @private {number} The maximum number of nodes in a GSQueue. */
  #MAX_NODES = 4294967295;

  /** @private {!Object} The most recently added node in the queue. */
  #newest;

  /** @private {!Object} The most oldest node in the queue. */
  #oldest;

  /** @private {number} The number of nodes in the queue. */
  #length;

  /**
   * @param {Array=} arr - An optional array of data to be loaded into the queue (oldest first).
   */
  construct(arr = []) {
    this.#newest = null;
    this.#oldest = null;
    this.#length = 0;
    for (let i=arr.length-1;i>=0;i--) {
      this.enqueue(arr[i]);
    }
  }

  /**
   * @type {number} The number of nodes in the queue. O(1) Performance.
   */
  get length() {
    return this.#length;
  }

  /**
   * Adds a new node to the queue. O(1) Performance.
   * @param {...any} values - The values to be stored in the node.
   */
  enqueue(...values) {
    if (this.#length >= this.#MAX_NODES) {
      throw new Error("Queue length cannot exceed "+this.#MAX_NODES+" nodes.");
    }
    for (const val of values) {
      let node = {
        'data': val,
        'next': null
      };
      if (!this.#length) {
        this.#oldest = node;
      } else {
        this.#newest.next = node;
      }
      this.#newest = node;
      this.#length++;
    }
  }

  /**
   * Enqueues each item contained in any number of other queues into this queue.
   * Queues are processed from left to right.
   * Queue entries are processed from oldest to newest.
   * O(1) Performance, for GSQueues.
   * O(n) Performance, for Arrays.
   * @param {...(GSQueue|Array)} otherQueues - Other queues to append to the current queue.
   */
  enqueueAll(...otherQueues) {
    for (const otherQueue of otherQueues) {
      if (otherQueue instanceof GSQueue) {
        let otherOldest = otherQueue.#oldest;
        let otherNewest = otherQueue.#newest;
        if (!otherOldest || !otherNewest) {
          continue;
        }
        if (!this.#newest) {
          this.#newest = otherNewest;
          this.#oldest = otherOldest;
        } else {
          this.#newest.next = otherOldest;
          this.#newest = otherNewest;
        }
        continue;
      }
      if (otherQueue instanceof Array) {
        this.enqueue(...otherQueue);
        continue;
      }
      throw new Error("Invalid Queue Format. Queues must be an instance of `GSQueue` or an `Array` of values.");
    }
  }

  /**
   * Removes the oldest node from the queue. O(1) Performance.
   * @return {any} The data that was stored in the node.
   */
  dequeue() {
    if (this.#length <= 0) {
      throw new Error("Cannot perform dequeue on an empty Queue.");
    }
    const node = this.#oldest;
    this.#oldest = node.next;
    if (node == this.#newest) {
      this.#newest = null;
    }
    this.#length--;
    return node.data;
  }

  /**
   * Convert the queue into a JSON string. O(n) Performance.
   * @return {string} A JSON string containing an array version of the queue.
   */
  toJSON() {
    return JSON.stringify(this.toArray());
  }

  /**
   * Convert the queue into a string. O(n) Performance.
   * @return {string} A string representing an array version of the queue.
   */
  toString() {
    return this.toArray().toString();
  }

  /**
   * Convert the queue into an Array.  O(n) Performance.
   * @return {Array<Any>} An Array version of the queue (oldest-first).
   */
  toArray() {
    const arr = [];
    if (!this.#length) return arr;
    let node = this.#oldest;
    do {
      arr.push(node);
      node = node.next;
    } while (node);
    return arr;
  }
}
