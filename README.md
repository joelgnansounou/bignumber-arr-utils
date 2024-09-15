# bignumber-arr-utils

A lightweight utility library designed for efficient manipulation and calculation of large numbers within arrays. Perfect for financial, scientific, and blockchain-related projects, this package provides a set of functions that handle operations on arrays of big numbers with precision and ease.

<br />

## Install

```bash
npm i bignumber-arr-utils
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

### **_Checking for an Item in the Array_**

The includes method checks if a specific BigNumber value is present in the array. It returns true if the value is found, and false otherwise.

- **Parameters:**

  - `n` - The value to check for in the array.

- **Returns:**
  - `boolean` - `true` if the array contains the specified value; otherwise, `false`.

```typescript
const arr = new BigNumberArrUtils(-0.8, 3e18, 1.0000000000000001, 5);
console.log(arr.includes(5)); // true
console.log(arr.includes(new BigNumber(6))); // false
console.log(arr.includes('3e18')); // true
console.log(arr.includes(1.1)); // false
```

### **_Calculating the product of all Items in the Array_**

Calculates and returns the product of all BigNumber instances in the array.

```typescript
const arr = new BigNumberArrUtils('1e+18', '2e+18', '3e+18');
console.log(arr.product().toString()); // "6e+54"
```

### **_Calculating the average of all Items in the Array_**

Calculates and returns the average of all BigNumber instances in the array.

```typescript
const arr = new BigNumberArrUtils(2, 4, 6, 8);
console.log(arr.mean().toString()); // "5"
```

### **_Filtering for values greater than a given BigNumber_**

Returns a new array that includes only BigNumber instances greater than the given value.

- **Parameters:**

  - `n` - The value to check against in the array.

```typescript
const arr = new BigNumberArrUtils(-10, 0.5, 3.5, 10.1);
console.log(arr.isGreaterThan(0)); // [BigNumber(0.5), BigNumber(3.5), BigNumber(10.1)]
console.log(arr.isGreaterThan(new BigNumber(3.5))); // [BigNumber(10.1)]
```

### **_Filtering for values greater than or equal to a given BigNumber_**

Returns a new array that includes only BigNumber instances greater than or equal to the given value.

- **Parameters:**

  - `n` - The value to check against in the array.

```typescript
const arr = new BigNumberArrUtils(-10, 0.5, 3.5, 10.1);
console.log(arr.isGreaterThanOrEqualTo(0)); // [BigNumber(0.5), BigNumber(3.5), BigNumber(10.1)]
console.log(arr.isGreaterThanOrEqualTo(new BigNumber(0.5))); // [BigNumber(0.5), BigNumber(3.5), BigNumber(10.1)]
console.log(arr.isGreaterThanOrEqualTo('10.1')); // [BigNumber(10.1)]
```

### **_Filtering for values less than a given BigNumber_**

Returns a new array that includes only BigNumber instances less than the given value.

- **Parameters:**

  - `n` - The value to check against in the array.

```typescript
const arr = new BigNumberArrUtils(1, 5, 8, 12);
console.log(arr.isLessThan(6)); // [BigNumber(1), BigNumber(5)]
console.log(arr.isLessThan(12)); // [BigNumber(1), BigNumber(5), BigNumber(8)]
```

### **_Filtering for values less than or equal to a given BigNumber_**

Returns a new array that includes only BigNumber instances less than or equal to the given value.

- **Parameters:**

  - `n` - The value to check against in the array.

```typescript
const arr = new BigNumberArrUtils(1, -7, 8, 12);
console.log(arr.isLessThanOrEqualTo(0)); // [BigNumber(-7)]
console.log(arr.isLessThanOrEqualTo(8)); // [BigNumber(1), BigNumber(-7), BigNumber(8)]
```

### **_Returning Unique BigNumber Values_**

Returns an array of unique BigNumber values, removing any duplicates.

```typescript
const arr = new BigNumberArrUtils(1, 2, 2, 3, 4, 4, 4, 5);
console.log(arr.unique()); // [BigNumber(1), BigNumber(2), BigNumber(3), BigNumber(4), BigNumber(5)]
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
