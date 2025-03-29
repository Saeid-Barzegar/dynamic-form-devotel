import { createValidationRules } from "./formValidation"

describe("CreateValidationRules", () => { 
  test("returns correct result", () => {
    const result = createValidationRules({
      fieldId: "zip_code",
      required: true,
      validation: {
        pattern: /^\d{5}$/,
        min: 5,
        max: 10
      }
    });
    const expectation = {
      required: 'This field is required',
      pattern: { value: /^\d{5}$/, message: "Please enter a valid ZIP Code" },
      min: { value: 5, message: 'Minimum value is 5' },
      max: { value: 10, message: 'Maximum value is 10' }
    }
    expect(result).toEqual(expectation)
  })
})