import { Field } from "../field";
import { ObjectValidationStates } from "../helpers/validationTypes";

export function create(
  field: Field<any, ObjectValidationStates>,
  objectShape: object
) {
  return new ObjectField(field, objectShape);
}

export class ObjectField extends Field<object, ObjectValidationStates> {
  objectShape: object;

  constructor(field: Field<any, ObjectValidationStates>, objectShape: object) {
    super({
      name: field["name"],
      label: field["label"],
      type: "object",
    });
    this.objectShape = objectShape;
    this.validations.push({
      name: "object",
      function: (value) => {
        if (typeof value !== "object") {
          throw new Error(`${this.label} must be an object.`);
        }
      },
    });
  }

  defineShape(shape: object, message?: string) {
    this.validations.push({
      name: "shape",
      function: (value) => {
        if (this.appliedValidations.shape) {
          throw new Error(`${this.label}'s shape is already defined.`);
        }
        for (const key of Object.keys(shape)) {
          const errorMessage =
            message?.replace("{value}", String(value)) ||
            `${this.label} must have a shape of ${shape}.`;
          if (!value!.hasOwnProperty(key)) {
            throw new Error(errorMessage);
          }
        }
      },
    });
    this.appliedValidations.shape = true;
    return this;
  }

  get shape() {
    return this.objectShape;
  }
}
