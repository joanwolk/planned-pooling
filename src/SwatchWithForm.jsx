import PropTypes from "prop-types";
import Swatch from './Swatch.jsx';
import Form from './Form.jsx';
import { useState } from "react";

function SwatchWithForm({ colorConfig, crowLength, stitchPattern, crows, colorShift, staggerLengths, showRowNumbers = false}) {
  const [formData, setFormData] = useState({
    colorConfig,
    crowLength,
    crows,
    colorShift,
    staggerLengths,
    stitchPattern,
    showRowNumbers,
  })

  return (
  <div>
    <Form
      formData={formData}
      setFormData={setFormData} 
    />
    <Swatch 
    className={formData.showRowNumbers ? "numbered" : ""}
    {...formData} />
  </div>
  );
}

SwatchWithForm.propTypes = {
  ...Swatch.propTypes,
  showRowNumbers: PropTypes.bool
};

export default SwatchWithForm;