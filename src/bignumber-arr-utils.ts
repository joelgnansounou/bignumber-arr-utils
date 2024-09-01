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

  constructor(...n: BigNumber.Value[]) {
    if (n.length) {
      this.arr = n
        .filter((arrItem) => BigNumberValidator.isValid(arrItem))
        .map((arrItem) => new BigNumber(arrItem));
    }
  }

  get items(): BigNumber[] {
    return this.arr;
  }

  add(n: BigNumber.Value): boolean {
    if (!BigNumberValidator.isValid(n)) return false;
    this.arr.push(new BigNumber(n));
    return true;
  }

  remove(n: BigNumber.Value): boolean {
    const index = this.arr.findIndex((arrItem) => arrItem.isEqualTo(n));
    if (index == -1) return false;

    this.arr.splice(index, 1);
    return true;
  }

  sum(): BigNumber {
    return this.arr.reduce((acc, curr) => acc.plus(curr), new BigNumber(0));
  }
}
