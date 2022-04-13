import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import {
  BmiInput, BmiOutput, BmiCalculator, BmiClassify,
} from '../helpers/bmi';

import BMI from '../components/BMI';

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

describe('Dom Testing', () => {
  it('Basic Dom Test', () => {
    render(<BMI />);

    const feetInput = screen.getByTestId('h-feet-input');
    const inchInput = screen.getByTestId('h-inch-input');
    const weightInput = screen.getByTestId('weight-input');

    fireEvent.change(feetInput, { target: { value: 5 } });
    fireEvent.change(inchInput, { target: { value: 3 } });
    fireEvent.change(weightInput, { target: { value: 125 } });

    expect(screen.getByTestId('bmi-bmi-output').textContent).toContain('22.7');
    expect(screen.getByTestId('bmi-category-output').textContent).toContain('Normal');
  });
});
