import { SwatchConfig, ColorSequenceArray, Color, StitchPattern } from './types'
import { isStringAColor } from './colorHelpers'

export function URLSearchParamsFromSwatchConfig(swatchConfig : SwatchConfig) : URLSearchParams {
  const flattenedParams = {
    stitchesPerRow: swatchConfig.stitchesPerRow.toString(),
    rows: swatchConfig.numberOfRows.toString(),
    colorShift: swatchConfig.colorShift.toString(),
    staggerLengths: swatchConfig.staggerLengths.toString(),
    stitchPattern: swatchConfig.stitchPattern.toString(),
    colors: swatchConfig.colorSequence.map(({color}) => color).toString(),
    colorLengths: swatchConfig.colorSequence.map(({length}) => length).toString()
  }
  return new URLSearchParams(flattenedParams);
}

function numberParserForParam (paramName : string) : (searchParams: URLSearchParams) => (number) {
  return (searchParams) => {
    const param = searchParams.get(paramName) || ''
    return parseInt(param)
  }
}

export const sanitizeSearchParamInputs = {
  colorSequence: (searchParams : URLSearchParams) : ColorSequenceArray | false => {
    const colorsString = searchParams.get('colors')
    const colorLengthsString = searchParams.get('colorLengths')
    if(!colorsString || !colorLengthsString) { return false }

    const colorsArray = colorsString.split(',')
    const colorLengths = colorLengthsString.split(',').map((l) => parseInt(l))

    if(colorsArray.length !== colorLengths.length) {
      return false
    }
    if(colorsArray.some((c) => !isStringAColor(c))) {
      return false
    }
    if(colorLengths.some((v) => isNaN(v))) {
      return false
    }

    return colorsArray.map((color, index) => ({ color: color as Color, length: colorLengths[index] }))
  },
  stitchesPerRow: numberParserForParam('stitchesPerRow'),
  numberOfRows: numberParserForParam('rows'),
  colorShift: numberParserForParam('colorShift'),
  staggerLengths: (searchParams: URLSearchParams, defaultValue: boolean) : boolean => {
    if(searchParams.get('staggerLengths') === 'false') {
      return false
    }
    if(searchParams.get('staggerLengths') === 'true') {
      return true
    }
    return defaultValue
  },
  stitchPattern: (searchParams: URLSearchParams) : StitchPattern | false => {
    const stitchPatternParam = searchParams.get('stitchPattern')
    if(!stitchPatternParam) { return false }
    //return StitchPattern[stitchPatternParam] || false // can't do this because typescript doesn't like it
    return Object.values<string>(StitchPattern).includes(stitchPatternParam) ? stitchPatternParam as StitchPattern : false
  },
}
