import BigNumber from 'bignumber.js';
import { test, expect, describe } from 'vitest';

import { BigNumberArrUtils } from './bignumber-arr-utils';

describe('BigNumberArrUtils', () => {
  describe('initialization', () => {
    test('should create the instance of the class', () => {
      const arr = new BigNumberArrUtils();
      expect(arr).toBeInstanceOf(BigNumberArrUtils);
    });

    test('should create an empty array when no params are passed', () => {
      const arr = new BigNumberArrUtils();
      expect(arr.items).toHaveLength(0);
    });

    test('should initialize with numbers as parameters', () => {
      const arr = new BigNumberArrUtils(1, 2, 3, 4);

      const expectedResult = [
        new BigNumber(1),
        new BigNumber(2),
        new BigNumber(3),
        new BigNumber(4),
      ];

      expect(arr.items).toStrictEqual(expectedResult);
    });

    test('should initialize with strings as parameters', () => {
      const arr = new BigNumberArrUtils('1', '2', '3', '4');

      const expectedResult = [
        new BigNumber(1),
        new BigNumber(2),
        new BigNumber(3),
        new BigNumber(4),
      ];

      expect(arr.items).toStrictEqual(expectedResult);
    });

    test('should initialize with BigNumber instances as parameters', () => {
      const arr = new BigNumberArrUtils(
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

      expect(arr.items).toStrictEqual(expectedResult);
    });

    test('should initialize with mixed types as parameters', () => {
      const arr = new BigNumberArrUtils('1', 2, 3, new BigNumber(4));

      const expectedResult = [
        new BigNumber(1),
        new BigNumber(2),
        new BigNumber(3),
        new BigNumber(4),
      ];

      expect(arr.items).toStrictEqual(expectedResult);
    });

    test('should not initialize with an empty string as parameter', () => {
      const arr = new BigNumberArrUtils('');
      expect(arr.items).toHaveLength(0);
    });
  });

  describe('add', () => {
    test('should return false if called with empty string as parameter', () => {
      const arr = new BigNumberArrUtils();
      expect(arr.add('')).toBe(false);
    });

    test('should return false if called with a non-numeric string as parameter', () => {
      const arr = new BigNumberArrUtils();
      expect(arr.add('abc')).toBe(false);
    });

    test('should add BigNumber instance to the array', () => {
      const arr = new BigNumberArrUtils();
      const bigNumber = new BigNumber(10);
      const result = arr.add(bigNumber);

      expect(result).toBe(true);
      expect(arr.items).toHaveLength(1);
      expect(arr.items.at(0)).toStrictEqual(bigNumber);
    });

    test('should add multiple valid items to the array', () => {
      const arr = new BigNumberArrUtils();
      arr.add(1);
      arr.add(2);
      arr.add(3);

      expect(arr.items).toHaveLength(3);
      expect(arr.items).toStrictEqual([
        new BigNumber(1),
        new BigNumber(2),
        new BigNumber(3),
      ]);
    });
  });

  describe('remove', () => {
    test("should return false if trying to remove an item that doesn't exists in the arrray", () => {
      const arr = new BigNumberArrUtils();
      expect(arr.remove(1)).toBe(false);
    });

    test('should remove bigNumber instance from the array', () => {
      const arr = new BigNumberArrUtils(new BigNumber(1), new BigNumber(2));

      const bigNumber = new BigNumber(1);
      const result = arr.remove(bigNumber);

      expect(result).toBe(true);
      expect(arr.items).toHaveLength(1);
    });

    test('should remove multiple valid items from the array', () => {
      const arr = new BigNumberArrUtils(1, 2, 3, 4, 5, 6);
      arr.remove(1);
      arr.remove(3);
      arr.remove(4);

      expect(arr.items).toHaveLength(3);
      expect(arr.items).toStrictEqual([
        new BigNumber(2),
        new BigNumber(5),
        new BigNumber(6),
      ]);
    });

    test('should return false if trying to remove an item that has already been removed', () => {
      const arr = new BigNumberArrUtils(1, 2);
      arr.remove(1);
      expect(arr.remove(1)).toBe(false);
    });

    test('should remove string representation of a number from the array', () => {
      const arr = new BigNumberArrUtils(1, 2, 3);
      const result = arr.remove('2');
      expect(result).toBe(true);
      expect(arr.items).toHaveLength(2);
      expect(arr.items).toStrictEqual([new BigNumber(1), new BigNumber(3)]);
    });

    test('should remove BigNumber with large precision from the array', () => {
      const arr = new BigNumberArrUtils(
        '1.0000000000000001',
        '2.0000000000000002',
      );
      const result = arr.remove('1.0000000000000001');
      expect(result).toBe(true);
      expect(arr.items).toHaveLength(1);
      expect(arr.items).toStrictEqual([new BigNumber('2.0000000000000002')]);
    });

    test('should return false when trying to remove from an empty array', () => {
      const arr = new BigNumberArrUtils();
      expect(arr.remove(1)).toBe(false);
    });
  });

  describe('sum', () => {
    test('should return 0 for an empty array', () => {
      const arr = new BigNumberArrUtils();
      const result = arr.sum();
      expect(result).toStrictEqual(new BigNumber(0));
    });

    test('should return the single item if array has only one item', () => {
      const arr = new BigNumberArrUtils(5);
      const result = arr.sum();
      expect(result).toStrictEqual(new BigNumber(5));
    });

    test('should correctly sum multiple items', () => {
      const arr = new BigNumberArrUtils(1, 2, 3, 4, 5);
      const result = arr.sum();
      expect(result).toStrictEqual(new BigNumber(15));
    });

    test('should correctly sum items with decimal values', () => {
      const arr = new BigNumberArrUtils('1.5', '2.5', '3.5');
      const result = arr.sum();
      expect(result).toStrictEqual(new BigNumber('7.5'));
    });

    test('should correctly sum negative numbers', () => {
      const arr = new BigNumberArrUtils(-1, -2, -3, -4, -5);
      const result = arr.sum();
      expect(result).toStrictEqual(new BigNumber(-15));
    });

    test('should correctly sum a mix of positive and negative numbers', () => {
      const arr = new BigNumberArrUtils(-1, 2, -3, 4, -5);
      const result = arr.sum();
      expect(result).toStrictEqual(new BigNumber(-3));
    });

    test('should correctly sum items with large values', () => {
      const arr = new BigNumberArrUtils('1e+18', '2e+18', '3e+18');
      const result = arr.sum();
      expect(result).toStrictEqual(new BigNumber('6e+18'));
    });

    test('should correctly sum items with high precision decimal values', () => {
      const arr = new BigNumberArrUtils(
        '1.0000000000000001',
        '2.0000000000000002',
        '3.0000000000000003',
      );
      const result = arr.sum();
      expect(result).toStrictEqual(new BigNumber('6.0000000000000006'));
    });
  });

  describe('min', () => {
    test('should throw an error when the array is empty', () => {
      const arr = new BigNumberArrUtils();
      expect(() => arr.min()).toThrow(
        'Array is empty, cannot determine minimum',
      );
    });

    test('should return the min', () => {
      const arr = new BigNumberArrUtils(1, 2, 3, 4, 5);
      const result = arr.min();
      expect(result).toStrictEqual(new BigNumber(1));
    });
  });

  describe('max', () => {
    test('should throw an error when the array is empty', () => {
      const arr = new BigNumberArrUtils();
      expect(() => arr.max()).toThrow(
        'Array is empty, cannot determine maximum',
      );
    });

    test('should return the max', () => {
      const arr = new BigNumberArrUtils(1, 2, 3, 4, 5);
      const result = arr.max();
      expect(result).toStrictEqual(new BigNumber(5));
    });
  });

  describe('includes', () => {
    test('should return false when the array is empty', () => {
      const arr = new BigNumberArrUtils();
      const result = arr.includes(1);
      expect(result).toBe(false);
    });

    test('should return false if the given input is not in the array', () => {
      const arr = new BigNumberArrUtils(1, 2, 3, 4, 5);
      const result = arr.includes(6);
      expect(result).toBe(false);
    });

    test('should return true if the given input is in the array', () => {
      const arr = new BigNumberArrUtils(1, 2, 3, 4, 5);
      const result = arr.includes(5);
      expect(result).toBe(true);
    });

    test('should return true if the input as a string is in the array', () => {
      const arr = new BigNumberArrUtils(1, 2, '3', 4, 5);
      const result = arr.includes('3');
      expect(result).toBe(true);
    });

    test('should return true if the input as BigNumber is in the array', () => {
      const arr = new BigNumberArrUtils(1, 2, 3, 4, 5);
      const result = arr.includes(new BigNumber(3));
      expect(result).toBe(true);
    });

    test('should return true if the negative number is in the array', () => {
      const arr = new BigNumberArrUtils(-1, -2, -3);
      const result = arr.includes(-2);
      expect(result).toBe(true);
    });

    test('should return false if the negative number is not in the array', () => {
      const arr = new BigNumberArrUtils(-1, -2, -3);
      const result = arr.includes(-4);
      expect(result).toBe(false);
    });
  });

  describe('product', () => {
    test('should return throw for an empty array', () => {
      const arr = new BigNumberArrUtils();
      expect(() => arr.product()).toThrow(
        'Array is empty, cannot determine product',
      );
    });

    test('should return the single item if array has only one item', () => {
      const arr = new BigNumberArrUtils(5);
      const result = arr.product();
      expect(result).toStrictEqual(new BigNumber(5));
    });

    test('should correctly find the product of multiple items', () => {
      const arr = new BigNumberArrUtils(1, 2, 3, 4, 5);
      const result = arr.product();
      expect(result).toStrictEqual(new BigNumber(120));
    });

    test('should correctly find the product of items with decimal values', () => {
      const arr = new BigNumberArrUtils('1.5', '2.5', '3.5');
      const result = arr.product();
      expect(result).toStrictEqual(new BigNumber('13.125'));
    });

    test('should correctly find the product of negative numbers', () => {
      const arr = new BigNumberArrUtils(-1, -2, -3, -4, -5);
      const result = arr.product();
      expect(result).toStrictEqual(new BigNumber(-120));
    });

    test('should correctly find the product of a mix of positive and negative numbers', () => {
      const arr = new BigNumberArrUtils(-1, 2, -3, 4, -5);
      const result = arr.product();
      expect(result).toStrictEqual(new BigNumber(-120));
    });

    test('should correctly find the product of items with large values', () => {
      const arr = new BigNumberArrUtils('1e+18', '2e+18', '3e+18');
      const result = arr.product();
      expect(result).toStrictEqual(new BigNumber('6e+54'));
    });

    test('should correctly find the product of items with high precision decimal values', () => {
      const arr = new BigNumberArrUtils(
        '1.0000000000000001',
        '2.0000000000000002',
        '3.0000000000000003',
      );
      const result = arr.product();
      expect(result).toStrictEqual(
        new BigNumber('6.000000000000001800000000000000180000000000000006'),
      );
    });
  });

  describe('mean', () => {
    test('should return throw for an empty array', () => {
      const arr = new BigNumberArrUtils();
      expect(() => arr.mean()).toThrow(
        'Array is empty, cannot determine average',
      );
    });

    test('should return the single item if array has only one item', () => {
      const arr = new BigNumberArrUtils(101);
      const result = arr.mean();
      expect(result).toStrictEqual(new BigNumber(101));
    });

    test('should correctly find the average of multiple items', () => {
      const arr = new BigNumberArrUtils(1, 2, 3, 4, 5);
      const result = arr.mean();
      expect(result).toStrictEqual(new BigNumber(3));
    });

    test('should correctly find the average items with decimal values', () => {
      const arr = new BigNumberArrUtils('1.5', '2.5', '3.5');
      const result = arr.mean();
      expect(result).toStrictEqual(new BigNumber('2.5'));
    });

    test('should correctly find the average negative numbers', () => {
      const arr = new BigNumberArrUtils(-1, -2, -3, -4, -5);
      const result = arr.mean();
      expect(result).toStrictEqual(new BigNumber(-3));
    });

    test('should correctly find the average a mix of positive and negative numbers', () => {
      const arr = new BigNumberArrUtils(-1, 2, -3, 4, -5);
      const result = arr.mean();
      expect(result).toStrictEqual(new BigNumber(-0.6));
    });

    test('should correctly find the average items with large values', () => {
      const arr = new BigNumberArrUtils('1e+18', '2e+18', '3e+18');
      const result = arr.mean();
      expect(result).toStrictEqual(new BigNumber('2e+18'));
    });

    test('should correctly find the average items with high precision decimal values', () => {
      const arr = new BigNumberArrUtils(
        '1.0000000000000001',
        '2.0000000000000002',
        '3.0000000000000003',
      );
      const result = arr.mean();
      expect(result).toStrictEqual(new BigNumber('2.0000000000000002'));
    });
  });

  describe('isGreaterThan', () => {
    test('should return an empty array when the array is empty', () => {
      const arr = new BigNumberArrUtils();
      const result = arr.isGreaterThan(5);
      expect(result).toStrictEqual([]);
    });

    test('should correctly find the BigNumber instances greater than the given value', () => {
      const arr = new BigNumberArrUtils(1, 5, 8, 12);
      const result = arr.isGreaterThan(5);
      expect(result).toStrictEqual([new BigNumber(8), new BigNumber(12)]);
    });

    test('should return an empty array if no items are greater than the given value', () => {
      const arr = new BigNumberArrUtils(1, 2, 3);
      const result = arr.isGreaterThan(5);
      expect(result).toStrictEqual([]);
    });

    test('should handle decimals and negative numbers correctly', () => {
      const arr = new BigNumberArrUtils(-10, 0.5, 3.5, 10.1);
      const result = arr.isGreaterThan(0);
      expect(result).toStrictEqual([
        new BigNumber(0.5),
        new BigNumber(3.5),
        new BigNumber(10.1),
      ]);
    });

    test('should not include values equal to the given value', () => {
      const arr = new BigNumberArrUtils(5, 5, 8, 12);
      const result = arr.isGreaterThan(5);
      expect(result).toStrictEqual([new BigNumber(8), new BigNumber(12)]);
    });
  });

  describe('isGreaterThanOrEqualTo', () => {
    test('should return an empty array when the array is empty', () => {
      const arr = new BigNumberArrUtils();
      const result = arr.isGreaterThanOrEqualTo(5);
      expect(result).toStrictEqual([]);
    });

    test('should correctly find the BigNumber instances greater than or equal to the given value', () => {
      const arr = new BigNumberArrUtils(1, 5, 8, 12);
      const result = arr.isGreaterThanOrEqualTo(5);
      expect(result).toStrictEqual([
        new BigNumber(5),
        new BigNumber(8),
        new BigNumber(12),
      ]);
    });

    test('should return an empty array if no items are greater than or equal to the given value', () => {
      const arr = new BigNumberArrUtils(1, 2, 3);
      const result = arr.isGreaterThanOrEqualTo(5);
      expect(result).toStrictEqual([]);
    });

    test('should handle both decimals and negative numbers correctly', () => {
      const arr = new BigNumberArrUtils(-40, -10, -30, 0.5, 3.5, 10.1);
      const result = arr.isGreaterThanOrEqualTo(-30);
      expect(result).toStrictEqual([
        new BigNumber(-10),
        new BigNumber(-30),
        new BigNumber(0.5),
        new BigNumber(3.5),
        new BigNumber(10.1),
      ]);
    });
  });
});
