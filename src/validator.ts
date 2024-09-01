import BigNumber from 'bignumber.js';

// Internal class for validation
export class BigNumberValidator {
  static isValid(n: BigNumber.Value): boolean {
    return !new BigNumber(n).isNaN();
  }
}
