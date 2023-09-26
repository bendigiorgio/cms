import { Field } from "../field";
import { NumberValidationStates } from "../helpers/validationTypes";

export function create(field: Field<any, NumberValidationStates>) {
  return new NumberField(field);
}

/**
 * Represents a field that accepts numeric values.
 * @template NumberValidationStates The type of validation states for the field.
 */
export class NumberField
  extends Field<number, NumberValidationStates>
  implements NumberField
{
  /**
   * Creates a new instance of the NumberField class.
   * @param field The field to create the NumberField instance from.
   */
  constructor(field: Field<any, NumberValidationStates>) {
    super({ name: field["name"], label: field["label"], type: "number" });
    this.validations.push({
      name: "number",
      function: (value) => {
        if (typeof value !== "number") {
          throw new Error(`${this.label} must be a number.`);
        }
      },
    });
  }

  /**
   * Adds a validation rule to ensure that the value is greater than or equal to the specified minimum value.
   * @param min The minimum value that the field must have.
   * @param message The error message to display if the validation fails.
   * @returns The current instance of the NumberField class.
   * @throws An error if the validation rule has already been applied to the field.
   */
  min(min: number, message?: string) {
    if (this.appliedValidations.min) {
      throw new Error(`${this.label}'s min is already set.`);
    }
    this.validations.push({
      name: "min",
      function: (value) => {
        if (value! < min) {
          const errorMessage =
            message?.replace("{value}", String(value)) ||
            `${this.label} must be at least ${min}.`;
          throw new Error(errorMessage);
        }
      },
    });
    this.appliedValidations.min = true;
    return this;
  }

  /**
   * Adds a validation rule to ensure that the value is less than or equal to the specified maximum value.
   * @param max The maximum value that the field must have.
   * @param message The error message to display if the validation fails.
   * @returns The current instance of the NumberField class.
   */
  max(max: number, message?: string) {
    this.validations.push({
      name: "max",
      function: (value) => {
        if (value! > max) {
          const errorMessage =
            message?.replace("{value}", String(value)) ||
            `${this.label} must be at most ${max}.`;
          throw new Error(errorMessage);
        }
      },
    });
    return this;
  }

  /**
   * Adds a validation rule to ensure that the value is an integer.
   * @param message The error message to display if the validation fails.
   * @returns The current instance of the NumberField class.
   */
  integer(message?: string) {
    this.validations.push({
      name: "integer",
      function: (value) => {
        if (!Number.isInteger(value!)) {
          const errorMessage =
            message?.replace("{value}", String(value)) ||
            `${this.label} must be an integer.`;
          throw new Error(errorMessage);
        }
      },
    });
    return this;
  }

  /**
   * Adds a validation rule to ensure that the value is positive.
   * @param message The error message to display if the validation fails.
   * @returns The current instance of the NumberField class.
   */
  positive(message?: string) {
    this.validations.push({
      name: "positive",
      function: (value) => {
        if (value! < 0) {
          const errorMessage =
            message?.replace("{value}", String(value)) ||
            `${this.label} must be positive.`;
          throw new Error(errorMessage);
        }
      },
    });
    return this;
  }

  /**
   * Adds a validation rule to ensure that the value is negative.
   * @param message The error message to display if the validation fails.
   * @returns The current instance of the NumberField class.
   */
  negative(message?: string) {
    this.validations.push({
      name: "negative",
      function: (value) => {
        if (value! > 0) {
          const errorMessage =
            message?.replace("{value}", String(value)) ||
            `${this.label} must be negative.`;
          throw new Error(errorMessage);
        }
      },
    });
    return this;
  }
}
