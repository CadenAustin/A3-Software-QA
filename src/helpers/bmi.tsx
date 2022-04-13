export interface BmiInput {
  hFeet: number;
  hInch: number;
  weight: number;
}

export interface BmiOutput {
  bmi: number;
  category: string;
}

function BmiClassify(bmi: number): string {
  let output: string;
  if (bmi < 18.5) output = 'Underweight';
  else if (bmi <= 24.9) output = 'Normal';
  else if (bmi <= 29.9) output = 'Overweight';
  else if (bmi >= 30) output = 'Obese';
  else return 'Invalid';
  return output;
}

function BmiCalculator(input: BmiInput): BmiOutput {
  const { hFeet, hInch, weight } = input;
  const kilos = weight * 0.45;
  const inches = (hFeet * 12) + hInch;
  const metersSquared = (inches * 0.025) ** 2;

  const bmi = Math.round((kilos / metersSquared) * 10) / 10;
  return {
    bmi,
    category: BmiClassify(bmi),
  };
}

export { BmiClassify, BmiCalculator };
