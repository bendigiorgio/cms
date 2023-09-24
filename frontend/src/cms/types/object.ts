import { Field } from "../field";

export function create(field: Field<any>, objectShape: object) {
  return new ObjectField(field, objectShape);
}

export class ObjectField extends Field<object> {
  objectShape: object;

  constructor(field: Field<any>, objectShape: object) {
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

  shape(shape: object, message?: string) {
    this.validations.push({
      name: "shape",
      function: (value) => {
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
    return this;
  }
}
