import { Field } from "../field";
import { BooleanValidationStates } from "../helpers/validationTypes";

export function create(field: Field<any, BooleanValidationStates>) {
  return new BooleanField(field);
}

export class BooleanField extends Field<boolean, BooleanValidationStates> {
  constructor(field: Field<any, BooleanValidationStates>) {
    super({
      name: field["name"],
      label: field["label"],
      type: "boolean",
    });

    this.validations.push({
      name: "boolean",
      function: (value) => {
        if (typeof value !== "boolean") {
          throw new Error(`${this.label} must be a boolean.`);
        }
      },
    });
  }
}
