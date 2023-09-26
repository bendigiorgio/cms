import { Field } from "../field";
import { ArrayValidationStates } from "../helpers/validationTypes";
import { BooleanField } from "./boolean";
import { NumberField } from "./number";
import { ObjectField } from "./object";
import { StringField } from "./string";

export function create(field: Field<any, ArrayValidationStates>) {
  return new ArrayField(field);
}

export class ArrayField extends Field<any[], ArrayValidationStates> {
  protected subType?: string;
  protected subField?:
    | Field<any, ArrayValidationStates>
    | StringField
    | ObjectField
    | ArrayField;

  constructor(field: Field<any, ArrayValidationStates>) {
    super({
      name: field["name"],
      label: field["label"],
      type: "array",
    });

    this.validations.push({
      name: "array",
      function: (value) => {
        if (!Array.isArray(value)) {
          throw new Error(`${this.label} must be an array.`);
        }
      },
    });
  }

  /**
   * Sets the minimum length of the array.
   * @param length - The minimum length of the array.
   * @param message - The error message to display if the validation fails.
   * @returns The current instance of the ArrayField.
   * @throws An error if the minimum length is already set.
   */
  minLength(length: number, message?: string) {
    if (this.appliedValidations.minLength) {
      throw new Error(`${this.label}'s minLength is already set.`);
    }
    this.validations.push({
      name: "minLength",
      function: (value) => {
        if (value!.length < length) {
          const errorMessage =
            message?.replace("{value}", String(value)) ||
            `${this.label} must have a minimum length of ${length}.`;
          throw new Error(errorMessage);
        }
      },
    });
    this.appliedValidations.minLength = true;
    return this;
  }

  /**
   * Sets the maximum length of the array.
   * @param length - The maximum length of the array.
   * @param message - The error message to display if the validation fails.
   * @returns The current instance of the ArrayField.
   * @throws An error if the maximum length is already set.
   */
  maxLength(length: number, message?: string) {
    if (this.appliedValidations.maxLength) {
      throw new Error(`${this.label}'s maxLength is already set.`);
    }
    this.validations.push({
      name: "maxLength",
      function: (value) => {
        if (value!.length > length) {
          const errorMessage =
            message?.replace("{value}", String(value)) ||
            `${this.label} must have a maximum length of ${length}.`;
          throw new Error(errorMessage);
        }
      },
    });
    this.appliedValidations.maxLength = true;
    return this;
  }

  /**
   * Sets the exact length of the array.
   * @param length - The exact length of the array.
   * @param message - The error message to display if the validation fails.
   * @returns The current instance of the ArrayField.
   * @throws An error if the length is already set.
   */
  length(length: number, message?: string) {
    if (this.appliedValidations.length) {
      throw new Error(`${this.label}'s length is already set.`);
    }
    this.validations.push({
      name: "length",
      function: (value) => {
        if (value!.length !== length) {
          const errorMessage =
            message?.replace("{value}", String(value)) ||
            `${this.label} must have a length of ${length}.`;
          throw new Error(errorMessage);
        }
      },
    });
    this.appliedValidations.length = true;
    return this;
  }

  /**
   * Sets the requirement for the array to have unique values.
   * @param message - The error message to display if the validation fails.
   * @returns The current instance of the ArrayField.
   * @throws An error if the unique validation is already set.
   */
  unique(message?: string) {
    if (this.appliedValidations.unique) {
      throw new Error(`${this.label}'s unique is already set.`);
    }
    this.validations.push({
      name: "unique",
      function: (value) => {
        const set = new Set(value);
        if (set.size !== value!.length) {
          const errorMessage =
            message?.replace("{value}", String(value)) ||
            `${this.label} must have unique values.`;
          throw new Error(errorMessage);
        }
      },
    });
    this.appliedValidations.unique = true;
    return this;
  }

  /**
   * Sets the type of the array elements.
   * @param type - The type of the array elements.
   * @param message - The error message to display if the validation fails.
   * @returns The current instance of the ArrayField.
   * @throws An error if the of validation is already set.
   */
  of(type: string, message?: string) {
    if (this.appliedValidations.of) {
      throw new Error(`${this.label}'s of is already set.`);
    }
    this.validations.push({
      name: "of",
      function: (value) => {
        for (const item of value!) {
          if (typeof item !== type) {
            const errorMessage =
              message?.replace("{value}", String(value)) ||
              `${this.label} must be an array of ${type}s.`;
            throw new Error(errorMessage);
          }
        }
      },
    });
    this.appliedValidations.of = true;
    return this;
  }

  string() {
    this.subType = "string";
    this.subField = new StringField(this);
    return this.subField;
  }
  number() {
    this.subType = "number";
    this.subField = new NumberField(this);
    return this.subField;
  }
  object(shape: object) {
    this.subType = "object";
    this.subField = new ObjectField(this, shape);
    return this.subField;
  }
  array() {
    this.subType = "array";
    this.subField = new ArrayField(this);
    return this.subField;
  }
  Boolean() {
    this.subType = "boolean";
    this.subField = new BooleanField(this);
    return this.subField;
  }
}
