import BigNumber from 'bignumber.js';
import { test, expect, describe } from 'vitest';

import { BigNumberArrUtils } from './bignumber-arr-utils';

describe('BigNumberArrUtils', () => {
  describe('initialization', () => {
    test('should create the instance of the class', () => {
      const bigNumberArrUtils = new BigNumberArrUtils();
      expect(bigNumberArrUtils).toBeInstanceOf(BigNumberArrUtils);
    });

    test('should create an empty array when no params are passed', () => {
      const bigNumberArrUtils = new BigNumberArrUtils();
      expect(bigNumberArrUtils.items).toHaveLength(0);
    });

    test('should initialize with numbers as parameters', () => {
      const bigNumberArrUtils = new BigNumberArrUtils(1, 2, 3, 4);

      const expectedResult = [
        new BigNumber(1),
        new BigNumber(2),
        new BigNumber(3),
        new BigNumber(4),
      ];

      expect(bigNumberArrUtils.items).toStrictEqual(expectedResult);
    });

    test('should initialize with strings as parameters', () => {
      const bigNumberArrUtils = new BigNumberArrUtils('1', '2', '3', '4');

      const expectedResult = [
        new BigNumber(1),
        new BigNumber(2),
        new BigNumber(3),
        new BigNumber(4),
      ];

      expect(bigNumberArrUtils.items).toStrictEqual(expectedResult);
    });

    test('should initialize with BigNumber instances as parameters', () => {
      const bigNumberArrUtils = new BigNumberArrUtils(
        new BigNumber(1),
        new BigNumber(2),
        new BigNumber(3),
        new BigNumber(4),
      );

      const expectedResult = [
        new BigNumber(1),
        new BigNumber(2),
        new BigNumber(3),
        new BigNumber(4),
      ];

      expect(bigNumberArrUtils.items).toStrictEqual(expectedResult);
    });

    test('should initialize with mixed types as parameters', () => {
      const bigNumberArrUtils = new BigNumberArrUtils(
        '1',
        2,
        3,
        new BigNumber(4),
      );

      const expectedResult = [
        new BigNumber(1),
        new BigNumber(2),
        new BigNumber(3),
        new BigNumber(4),
      ];

      expect(bigNumberArrUtils.items).toStrictEqual(expectedResult);
    });

    test('should not initialize with an empty string as parameter', () => {
      const bigNumberArrUtils = new BigNumberArrUtils('');
      expect(bigNumberArrUtils.items).toHaveLength(0);
    });
  });

  describe('add', () => {
    test('should return false if called with empty string as parameter', () => {
      const bigNumberArrUtils = new BigNumberArrUtils();
      expect(bigNumberArrUtils.add('')).toBe(false);
    });

    test('should return false if called with a non-numeric string as parameter', () => {
      const bigNumberArrUtils = new BigNumberArrUtils();
      expect(bigNumberArrUtils.add('abc')).toBe(false);
    });

    test('should add BigNumber instance to the array', () => {
      const bigNumberArrUtils = new BigNumberArrUtils();
      const bigNumber = new BigNumber(10);
      const result = bigNumberArrUtils.add(bigNumber);

      expect(result).toBe(true);
      expect(bigNumberArrUtils.items).toHaveLength(1);
      expect(bigNumberArrUtils.items.at(0)).toStrictEqual(bigNumber);
    });

    test('should add multiple valid items to the array', () => {
      const bigNumberArrUtils = new BigNumberArrUtils();
      bigNumberArrUtils.add(1);
      bigNumberArrUtils.add(2);
      bigNumberArrUtils.add(3);

      expect(bigNumberArrUtils.items).toHaveLength(3);
      expect(bigNumberArrUtils.items).toStrictEqual([
        new BigNumber(1),
        new BigNumber(2),
        new BigNumber(3),
      ]);
    });
  });
});
