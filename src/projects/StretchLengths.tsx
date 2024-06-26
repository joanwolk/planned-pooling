import SwatchWithForm from '../SwatchWithForm';
import { StitchPattern, Color } from '../types'
import { useSwatchConfigStateFromURLParams, useEffectToUpdateURLParamsFromSwatchConfig } from '../URLSwatchParams';

const red = "#ff001d" as Color;
const cream = "#fcf7eb" as Color;
const ltblue = "#8dd0f2" as Color;
const navy = "#0e0e66" as Color;

function StretchLengths() {
  const defaultSwatchConfig = {
    colorSequence: [
      {color: navy, length: 3},
      {color: red, length: 3},
      {color: navy, length: 3},
      {color: ltblue, length: 2},
      {color: cream, length: 5},
      {color: ltblue, length: 2},
    ],
    stitchesPerRow: 18, //Note: explicitly ok not saving zero from search params here
    numberOfRows: 40, //Note: explicitly ok not pulling zero from search params here
    colorShift: 0,
    staggerLengths: false,
    stitchPattern: StitchPattern.moss,
  }

  const { swatchConfig, setSwatchConfig, setSearchParams} = useSwatchConfigStateFromURLParams(defaultSwatchConfig);

  useEffectToUpdateURLParamsFromSwatchConfig(swatchConfig, setSearchParams)

  return (
    <div>
      <p>This is an experimental page</p>
      <ul>
        <li>alternating row lengths uses the color stretching technique instead of changing lengths of rows</li>
        <li>there is a button to double your colors</li>
      </ul>
      <p>If you don&apos;t know what I&apos;m talking about use the <a href='/'>main app.</a></p>
      <SwatchWithForm
        swatchConfig={swatchConfig}
        setSwatchConfig={setSwatchConfig}
        staggerType={'colorStretched'}
        showExperimentalFeatures={true}
      />
    </div>
  );
}

export default StretchLengths;
