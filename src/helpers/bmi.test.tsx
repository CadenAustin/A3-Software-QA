import { BmiInput, BmiOutput, bmi_calculator, bmi_classify } from "./bmi"

describe("Testing Calculator", () => {
    it("Basic Test", () => {
        let test_input: BmiInput = {
            h_feet: 5,
            h_inch: 3,
            weight: 125
        }

        let test_output: BmiOutput = {
            bmi: 22.7,
            category: "Normal",
        }

        let test_result: BmiOutput = bmi_calculator(test_input);

        expect(test_result).toStrictEqual(test_output);
    })
})

describe("Testing Classifier", () => {
    it.each([
        [18.4, "Underweight"],
        [18.5, "Normal"],
        [24.9, "Normal"],
        [25.0, "Overweight"],
        [29.9, "Overweight"],
        [30.0, "Obese"],
    ])('Expects %p to be classified as %p', (bmi: number, cat: string) => {
        expect(bmi_classify(bmi)).toBe(cat);
    });

    it.each([
        [18.5, "Underweight"],
        [18.4, "Normal"],
        [24.9, "Overweight"],
        [25.0, "Normal"],
        [29.9, "Obese"],
        [30.0, "Overweight"],
    ])('Expects %p not to be classified as %p', (bmi: number, cat: string) => {
        expect(bmi_classify(bmi)).not.toBe(cat);
    });
})