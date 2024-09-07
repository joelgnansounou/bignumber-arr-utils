import BigNumber from 'bignumber.js';

import { BigNumberValidator } from './validator';

// Interface for array utility operations
interface IArrayUtils<T> {
  items: T[];
  add(item: T): boolean;
  remove(item: T): boolean;
  sum(): T;
}

export class BigNumberArrUtils implements IArrayUtils<BigNumber> {
  private readonly arr: BigNumber[] = [];

  /**
   * Creates an instance of `BigNumberArrUtils` and initializes the array with valid `BigNumber` instances.
   *
   * If no arguments are provided, the array is initialized as empty. If arguments are provided,
   * each argument is validated and converted to a `BigNumber` before being added to the array.
   * Invalid arguments (e.g., non-numeric strings) are filtered out.
   *
   * ```ts
   * // Example with valid numbers
   * const arr = new BigNumberArrUtils(1, '2', new BigNumber(3));
   * console.log(arr.items);                  // [BigNumber(1), BigNumber(2), BigNumber(3)]
   *
   * // Example with mixed valid and invalid numbers
   * const arr2 = new BigNumberArrUtils(1, 'invalid', 2);
   * console.log(arr2.items);                 // [BigNumber(1), BigNumber(2)]
   *
   * // Example with no arguments
   * const arr3 = new BigNumberArrUtils();
   * console.log(arr3.items);                 // []
   * ```
   *
   * @param {...BigNumber.Value[]} n - A list of values to be converted to `BigNumber` and added to the array.
   */
  constructor(...n: BigNumber.Value[]) {
    if (n.length) {
      this.arr = n
        .filter((arrItem) => BigNumberValidator.isValid(arrItem))
        .map((arrItem) => new BigNumber(arrItem));
    }
  }

  /**
   * Returns the list of BigNumber instances in the array.
   *
   * ```ts
   * arr = new BigNumberArrUtils(-0.8, '1.0000000000000001', new BigNumber('3e+18'))
   * console.log(arr.items);                  // [BigNumber(-0.8), BigNumber(1.0000000000000001), BigNumber(3e+18)]
   * ```
   */
  get items(): BigNumber[] {
    return this.arr;
  }

  /**
   * Adds a new BigNumber instance to the array.
   * Returns `false` if the given input is not a valid BigNumber.Value.
   * Returns `true` if the new BigNumber instance has been added to the array.
   *
   * ```ts
   * const arr = new BigNumberArrUtils();
   * arr.add(-0.8);                          // true
   * arr.add('abc');                         // false
   * arr.add(3e+18);                         // true
   * console.log(arr.items);                 // [BigNumber(-0.8), BigNumber(3e+18)]
   * ```
   *
   * @param {BigNumber.Value} n - The value to be added as a BigNumber.
   */
  add(n: BigNumber.Value): boolean {
    if (!BigNumberValidator.isValid(n)) return false;
    this.arr.push(new BigNumber(n));
    return true;
  }

  /**
   * Removes an instance of BigNumber from the array.
   * Returns `false` if the given input is not found in the array.
   * Returns `true` if the BigNumber has been removed from the array.
   *
   * ```ts
   * const arr = new BigNumberArrUtils(-0.8, 3e+18, 1.0000000000000001);
   * arr.remove(-1);                          // false
   * arr.remove(3e+18);                       // true
   * console.log(arr.items);                  // [BigNumber(-0.8), BigNumber(1.0000000000000001)]
   * ```
   *
   * @param {BigNumber.Value} n - The value to be removed from the array.
   */
  remove(n: BigNumber.Value): boolean {
    const index = this.arr.findIndex((arrItem) => arrItem.isEqualTo(n));
    if (index == -1) return false;

    this.arr.splice(index, 1);
    return true;
  }

  /**
   * Returns the sum of all BigNumber instances in the array.
   *
   * ```ts
   * const arr = new BigNumberArrUtils(-0.8, 3e+18, 1.0000000000000001);
   * console.log(arr.sum());                  // BigNumber(3000000000000000001.2)
   * ```
   */
  sum(): BigNumber {
    return this.arr.reduce((acc, curr) => acc.plus(curr), new BigNumber(0));
  }

  /**
   * Returns the minimum of all BigNumber instances in the array.
   *
   * @throws {Error} If the array is empty.
   *
   * ```ts
   * const arr = new BigNumberArrUtils(-0.8, 3e+18, 1.0000000000000001);
   * console.log(arr.min().toString());       // "-0.8"
   * ```
   */
  min(): BigNumber {
    if (!this.arr.length)
      throw new Error('Array is empty, cannot determine minimum');

    return this.arr.reduce((min, arrItem) =>
      arrItem.isLessThan(min) ? arrItem : min,
    );
  }

  /**
   * Returns the maximum of all BigNumber instances in the array.
   *
   * @throws {Error} If the array is empty.
   *
   * ```ts
   * const arr = new BigNumberArrUtils(-0.8, 3e+18, 1.0000000000000001);
   * console.log(arr.max().toString());       // "3e+18"
   * ```
   */
  max(): BigNumber {
    if (!this.arr.length)
      throw new Error('Array is empty, cannot determine maximum');

    return this.arr.reduce((max, arrItem) =>
      arrItem.isGreaterThan(max) ? arrItem : max,
    );
  }

  /**
   * Checks if the array contains a BigNumber instance equivalent to the given value.
   *
   * This method converts each BigNumber instance in the array and the input value
   * to their string representations before checking for inclusion.
   * This ensures accurate comparison even with floating-point numbers and very large values.
   *
   * @param {BigNumber.Value} n - The value to check for in the array.
   * @returns {boolean} - Returns `true` if the array contains an equivalent BigNumber; otherwise, `false`.
   *
   * ```typescript
   * const arr = new BigNumberArrUtils(-0.8, 3e18, 1.000000001);
   * console.log(arr.includes(3e18));         // true
   * console.log(arr.includes(1.000000002));  // false
   * ```
   */
  includes(n: BigNumber.Value): boolean {
    return this.arr
      .map((arrItem) => arrItem.toString())
      .includes(new BigNumber(n).toString());
  }
}
