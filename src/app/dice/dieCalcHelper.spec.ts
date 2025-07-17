import { TestBed } from '@angular/core/testing';
import { DieCalcHelper } from './dieCalcHelper';

describe('DieCalcHelper', () => {
  
  it('all 1s has one outcome', () => {
    const pairs = DieCalcHelper.CalculatePairs(1, 1, 1, 1);
    expect(pairs.length).toBe(1);
  });

  it('all 1s outcome is [2, 2]', () => {
    const pairs = DieCalcHelper.CalculatePairs(1, 1, 1, 1);
    expect(pairs[0][0]).toBe(2);
    expect(pairs[0][1]).toBe(2);
  });

  it('1, 2, 3, 4 outcome is [3, 7], [4, 6], [5, 5]', () => {
    const pairs = DieCalcHelper.CalculatePairs(1, 2, 3, 4);
    const expectedPairs = [[3, 7], [4, 6], [5, 5]];
    expect(pairs.length).toBe(expectedPairs.length);

    for(let ep of expectedPairs){
      let forward = pairs.some(p => ep[0] === p[0] && ep[1] === p[1]);
      let reverse = pairs.some(p => ep[0] === p[1] && ep[1] === p[0]);
      expect(forward || reverse).toBeTrue();
    }
  });

});
