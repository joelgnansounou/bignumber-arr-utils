# bignumber-arr-utils

A lightweight utility library designed for efficient manipulation and calculation of large numbers within arrays. Perfect for financial, scientific, and blockchain-related projects, this package provides a set of functions that handle operations on arrays of big numbers with precision and ease.

<br />

## Install

```bash
$ npm i bignumber-arr-utils
```

## Usage

To get started, import the `BigNumberArrUtils` class from the package:

```typescript
import BigNumber from 'bignumber.js';
import { BigNumberArrUtils } from 'bignumber-arr-utils';
```

## Example Usage

### **_Creating an Instance_**

Creates an instance of `BigNumberArrUtils` and initializes the array with valid `BigNumber` instances.

- **Parameters:**
  - `...n` - A list of values to be converted to `BigNumber` and added to the array.

```typescript
const arr = new BigNumberArrUtils(1, '2', new BigNumber(3));
```

### **_Getting the items on the array_**

Returns the list of BigNumber instances in the array.

```typescript
const arr = new BigNumberArrUtils(1, '2', new BigNumber(3));
console.log(arr.items); // [BigNumber(1), BigNumber(2), BigNumber(3)]
```

### **_Adding Items_**

Adds a new BigNumber instance to the array. Returns false if the given input is not a valid BigNumber.Value. Returns true if the new BigNumber instance has been added to the array.

- **Parameters:**
  - `n` - The value to be added as a BigNumber.

```typescript
const arr = new BigNumberArrUtils();
console.log(arr.add(-0.8)); // true
console.log(arr.add('abc')); // false
console.log(arr.add(3e18)); // true
console.log(arr.items); // [BigNumber(-0.8), BigNumber(3e+18)]
```

### **_Removing Items_**

Removes an instance of BigNumber from the array. Returns false if the given input is not found in the array. Returns true if the BigNumber has been removed from the array.

- **Parameters:**
  - `n` - The value to be removed from the array.

```typescript
const arr = new BigNumberArrUtils(-0.8, 3e18, 1.0000000000000001);
console.log(arr.remove(-1)); // false
console.log(arr.remove(3e18)); // true
console.log(arr.items); // [BigNumber(-0.8), BigNumber(1.0000000000000001)]
```

### **_Calculating the Sum_**

Returns the sum of all BigNumber instances in the array.

```typescript
const arr = new BigNumberArrUtils(-0.8, 3e18, 1.0000000000000001);
console.log(arr.sum().toString()); // "3000000000000000001.2"
```

### **_Determining the Min_**

Returns the minimum of all BigNumber instances in the array.

```typescript
const arr = new BigNumberArrUtils(-0.8, 3e18, 1.0000000000000001);
console.log(arr.min().toString()); // "-0.8"
```

### **_Determining the Max_**

Returns the maximum of all BigNumber instances in the array.

```typescript
const arr = new BigNumberArrUtils(-0.8, 3e18, 1.0000000000000001);
console.log(arr.max().toString()); // "3e18"
```

## Contributing

If you want to contribute to this project, please follow these steps:

<ol>
  <li>Fork the repository.</li>
  <li>Create a new branch (git checkout -b feature/your-feature).</li>
  <li>Commit your changes (git commit -am 'Add some feature').</li>
  <li>Push to the branch (git push origin feature/your-feature).</li>
  <li>Create a new Pull Request.</li>
</ol>

## Licence

The MIT Licence.

See [LICENCE](https://github.com/joelgnansounou/bignumber-arr-utils/tree/master?tab=MIT-1-ov-file).
