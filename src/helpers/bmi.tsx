export interface BmiInput {
    h_feet: number;
    h_inch: number;
    weight: number;
}

export interface BmiOutput {
    bmi: number;
    category: string;
}

function bmi_classify(bmi: number): string {
    let output: string;
    if (bmi < 18.5) output = "Underweight";
    else if (bmi <= 24.9) output = "Normal";
    else if (bmi <= 29.9) output = "Overweight";
    else if (bmi >= 30) output = "Obese";
    else return "Invalid";
    return output
}

function bmi_calculator(input: BmiInput): BmiOutput {
    const {h_feet, h_inch, weight} = input
    let kilos = weight * 0.45;
    let inches = (h_feet * 12) + h_inch
    let meters_squared = (inches * 0.025) ** 2;

    let bmi = Math.round((kilos / meters_squared) * 10) / 10
    console.log(bmi, kilos/meters_squared)
    return {
        bmi: bmi,
        category: bmi_classify(bmi),
    }
}

export {bmi_classify, bmi_calculator}