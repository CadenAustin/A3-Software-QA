import {
  BmiInput, BmiOutput, BmiCalculator, BmiClassify,
} from './bmi';

describe('Testing Calculator', () => {
  it('Basic Test', () => {
    const testInput: BmiInput = {
      hFeet: 5,
      hInch: 3,
      weight: 125,
    };

    const testOutput: BmiOutput = {
      bmi: 22.7,
      category: 'Normal',
    };

    const testResult: BmiOutput = BmiCalculator(testInput);

    expect(testResult).toStrictEqual(testOutput);
  });
});

describe('Testing Classifier', () => {
  it.each([
    [18.4, 'Underweight'],
    [18.5, 'Normal'],
    [24.9, 'Normal'],
    [25.0, 'Overweight'],
    [29.9, 'Overweight'],
    [30.0, 'Obese'],
  ])('Expects %p to be classified as %p', (bmi: number, cat: string) => {
    expect(BmiClassify(bmi)).toBe(cat);
  });

  it.each([
    [18.5, 'Underweight'],
    [18.4, 'Normal'],
    [24.9, 'Overweight'],
    [25.0, 'Normal'],
    [29.9, 'Obese'],
    [30.0, 'Overweight'],
  ])('Expects %p not to be classified as %p', (bmi: number, cat: string) => {
    expect(BmiClassify(bmi)).not.toBe(cat);
  });
});
