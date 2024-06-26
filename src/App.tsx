import SwatchWithForm from './SwatchWithForm';
import { StitchPattern, Color } from './types'
import { useSwatchConfigStateFromURLParams, useEffectToUpdateURLParamsFromSwatchConfig } from './URLSwatchParams';

const red = "#ff001d" as Color;
const cream = "#fcf7eb" as Color;
const ltblue = "#8dd0f2" as Color;
const navy = "#0e0e66" as Color;

function App() {
  const defaultSwatchConfig = {
    colorSequence: [
      {color: navy, length: 3},
      {color: red, length: 3},
      {color: navy, length: 3},
      {color: ltblue, length: 2},
      {color: cream, length: 5},
      {color: ltblue, length: 2},
    ],
    stitchesPerRow: 18,
    numberOfRows: 40,
    colorShift: 0,
    staggerLengths: false,
    stitchPattern: StitchPattern.moss
  }

  const { swatchConfig, setSwatchConfig, setSearchParams} = useSwatchConfigStateFromURLParams(defaultSwatchConfig);

  useEffectToUpdateURLParamsFromSwatchConfig(swatchConfig, setSearchParams)


  return (
    <SwatchWithForm swatchConfig={swatchConfig} setSwatchConfig={setSwatchConfig} />
  );
}

export default App;
