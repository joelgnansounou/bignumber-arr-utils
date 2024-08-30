import BigNumber from 'bignumber.js';

export class BigNumberArrUtils {
  private readonly arr: BigNumber[] = [];

  constructor(...n: BigNumber.Value[]) {
    if (n.length) {
      this.arr = n
        .filter((arrItem) => this.checkInput(arrItem))
        .map((arrItem) => new BigNumber(arrItem));
    }
  }

  get items() {
    return this.arr;
  }

  add(n: BigNumber.Value) {
    if (!this.checkInput(n)) return false;
    this.arr.push(new BigNumber(n));
    return true;
  }

  private checkInput(n: BigNumber.Value) {
    if (typeof n != 'string') return true;
    return !new BigNumber(n).isNaN();
  }
}
