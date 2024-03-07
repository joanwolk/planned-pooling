import { Color, ColorConfig, ColorConfigArray } from './types'
export function nextStitchColorByIndex(i : number, colorConfig : ColorConfigArray, { colorShift } = { colorShift: 0 } ):Color {
  const flatColorSequenceArray = colorConfig.reduce((ary : Array<Color>, conf: ColorConfig) : Array<Color> => ary.concat(new Array(conf.length).fill(conf.color)), []);
  return flatColorSequenceArray[(i + colorShift) % flatColorSequenceArray.length];
}