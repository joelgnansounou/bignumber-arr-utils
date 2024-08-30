import BigNumber from 'bignumber.js';

export class BigNumberArrUtils {
  private readonly arr: BigNumber[] = [];

  constructor(...n: BigNumber.Value[]) {
    if (n.length) {
      this.arr = n
        .filter((arrItem) => {
          if (typeof arrItem != 'string') return arrItem;
          return arrItem.length > 0;
        })
        .map((arrItem) => new BigNumber(arrItem));
    }
  }

  get items() {
    return this.arr;
  }
}
