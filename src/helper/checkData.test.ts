import { isValidResult } from '../helper/checkData';
import { mockDataTest } from '../mock/mock';

describe('isValidResult function', () => {
  it('returns true if argument is an array of BeerSort objects', () => {
    const value = isValidResult(mockDataTest);
    expect(value).toBeTruthy();
  });
});
