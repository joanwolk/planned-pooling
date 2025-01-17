import { describe, it, expect } from 'vitest'
import { ColorSequenceArray } from './types'
import {
  swatchMatrix
} from './swatchHelpers'

describe('swatchMatrix', () => {
  it.skip("doesn't choke on zeros")
  it('creates a matrix of color codes based on the color sequence with the colors in the even rows filling in in the reverse direction', () => {
    expect(
      swatchMatrix({colorSequence: [
        {color: '#aaa', length: 1},
        {color: '#bbb', length: 1},
        {color: '#ccc', length: 1},
        {color: '#ddd', length: 1},
        {color: '#eee', length: 1},
      ] as ColorSequenceArray,
        stitchesPerRow: 4,
        numberOfRows: 3,
        staggerLengths: false,
        colorShift: 0
      })).toEqual([
        ["#aaa","#bbb","#ccc","#ddd"],
        ["#ccc","#bbb","#aaa","#eee"],
        ["#ddd","#eee","#aaa","#bbb"]
      ])
  })
  it('accounts for colors of different lengths and number of rows', () => {
    expect(swatchMatrix({
      colorSequence: [
        {color: '#000', length: 3},
        {color: '#111', length: 2},
        {color: '#222', length: 4},
      ] as ColorSequenceArray,
      stitchesPerRow: 4,
      numberOfRows: 4,
      staggerLengths: false,
      colorShift: 0
    })).toEqual([
      ["#000","#000","#000","#111"],
      ["#222","#222","#222","#111"],
      ["#222","#000","#000","#000"],
      ["#222","#222","#111","#111"]
    ])
  })
  it('accounts for different numbers of stitches per row', () => {
    expect(
      swatchMatrix({colorSequence: [
        {color: '#aaa', length: 1},
        {color: '#bbb', length: 1},
        {color: '#ccc', length: 1},
        {color: '#ddd', length: 1},
        {color: '#eee', length: 1},
      ] as ColorSequenceArray,
        stitchesPerRow: 5,
        numberOfRows: 3,
        staggerLengths: false,
        colorShift: 0
      })).toEqual([
        ["#aaa","#bbb","#ccc","#ddd","#eee"],
        ["#eee","#ddd","#ccc","#bbb","#aaa"],
        ["#aaa","#bbb","#ccc","#ddd","#eee"],
      ])
  })
  it('accounts for color shift', () => {
    expect(
      swatchMatrix({colorSequence: [
        {color: '#aaa', length: 1},
        {color: '#bbb', length: 1},
        {color: '#ccc', length: 1},
        {color: '#ddd', length: 1},
        {color: '#eee', length: 1},
      ] as ColorSequenceArray,
        stitchesPerRow: 4,
        numberOfRows: 3,
        staggerLengths: false,
        colorShift: 3
      })).toEqual([
        ["#ddd","#eee","#aaa","#bbb"],
        ["#aaa","#eee","#ddd","#ccc"],
        ["#bbb","#ccc","#ddd","#eee"]
      ])
  })
  it('staggers lengths')
  it('swallows stitches')
  it('stretches stitches')
})
