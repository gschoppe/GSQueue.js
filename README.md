# GSQueue.js
A small implementation of a Queue with O(1) performance on enqueue and dequeue.

---

## Usage

### Import

```javascript
import { GSQueue as Queue } from './GSQueue.js';
```

### Instantiate

```javascript
// Instantiate an empty queue
const q = new Queue();

// Instantiate a queue from an array of values
const q = new Queue(['oldest','old', 'new', 'newest']);
```

### Enqueue

```javascript
const q = new Queue();

console.log(q.length); // output: 0

// enqueue a single value
q.enqueue(1);

// enqueue multiple values
q.enqueue(2, 3, 4);

// enqueue an array of values
q.enqueue(...[5, 6, 7]);

console.log(q.toString()); // output: 1, 2, 3, 4, 5, 6, 7
```

### EnqueueAll

```javascript
const q = new Queue([1,2]);
const q2 = new Queue([3,4]);
const q3 = [5,6];
const q4 = new Queue([7,8]);

// Enqueue the contents of a single queue
q.enqueueAll(q2);

// Enqueue the contents of multiple queues
q.enqueueAll(q3,q4);


console.log(q.toString()); // output: 1, 2, 3, 4, 5, 6, 7, 8
```

### Dequeue

```javascript
const q = new Queue(["val1", "val2", "val3", "val4"]);
console.log(q.length); // output: 4

const a = q.dequeue();
const b = q.dequeue();

console.log(a, b); // output: val1 val2
console.log(q.length); // output: 2
```

### Get length

```javascript
const q = new Queue(['oldest','old', 'new', 'newest']);

console.log(q.length); // outputs: 4
```

### Convert

```javascript
const q = new Queue();

q.enqueue("val1");
q.enqueue("val2");

// convert to string
console.log(q.toString()); // output: val1, val2

// convert to Array
console.log(q.toArray()); // output: (2) ['val1', 'val2']

// convert to JSON
console.log(q.toJSON()); // output: ["val1","val2"]
console.log(JSON.stringify(q)); // output: ["val1","val2"]
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

This project is maintained in my free time. If I take too long responding to issues or pull requests, please fork and modify however you need.

## License

This source code was authored by [Gregory Schoppe](https://gschoppe.com), and is licensed under the [MIT License](https://choosealicense.com/licenses/mit/).

## Support this project

[![Buy Me A Coffee](https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png)](https://www.buymeacoffee.com/gschoppe)
