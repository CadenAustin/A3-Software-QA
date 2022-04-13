import React, { ReactElement, useState, useEffect } from 'react';

import { BmiInput, BmiOutput, BmiCalculator } from '../helpers/bmi';

function BMI(): ReactElement {
  const [input, setInput] = useState<BmiInput>({
    hFeet: 0,
    hInch: 0,
    weight: 0,
  });

  const [output, setOutput] = useState<BmiOutput | undefined>();
  const [error, setError] = useState<undefined | string>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let numValue = parseInt(value, 10);
    let tempError: undefined | string;

    if ((name === 'weight' || name === 'h_feet') && !(numValue > 0)) {
      tempError = `${name} should be greater than 0`;
      numValue = 0;
    } else if ((name === 'h_inch' && (numValue >= 12 || numValue < 0))) {
      tempError = 'Inches should be between 0 and 11';
      numValue = 0;
    } else {
      tempError = undefined;
    }

    setInput({
      ...input,
      [name]: numValue,
    });

    setError(tempError);
  };

  useEffect(() => {
    if (input.hFeet > 0 && input.hInch >= 0 && input.hInch <= 11 && input.weight > 0) {
      setOutput(BmiCalculator(input));
    }
  }, [input]);

  return (
    <div>
      <div className="bmi-form">
        <div className="bmi-form-input">
          <p>
            Height in Feet:
          </p>
          <input
            value={input.hFeet}
            type="number"
            onChange={handleChange}
            name="hFeet"
          />
        </div>
        <div className="bmi-form-input">
          <p>
            Height in Inches
          </p>
          <input
            value={input.hInch}
            type="number"
            onChange={handleChange}
            name="hInch"
          />
        </div>
        <div className="bmi-form-input">
          <p>
            Weight in Pounds:
          </p>
          <input
            value={input.weight}
            type="number"
            onChange={handleChange}
            name="weight"
          />
        </div>
        {error
                    && <p className="bmi-error">{error}</p>}
      </div>
      {output
                && (
                <div className="bmi-output">
                  <h4>
                    BMI:
                    {' '}
                    {output.bmi}
                  </h4>
                  <h4>
                    BMI Category:
                    {' '}
                    {output.category}
                  </h4>
                </div>
                )}
    </div>
  );
}

export default BMI;
