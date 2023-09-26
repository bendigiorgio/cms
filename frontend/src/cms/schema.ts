import { Field } from "./field";
import { ObjectValidationStates } from "./helpers/validationTypes";
import { ObjectField } from "./types/object";

export class Schema extends Field<object, ObjectValidationStates> {
  objectShape: object;
  field: Field<any, ObjectValidationStates>;

  constructor(
    { name, label }: { name: string; label: string },
    objectShape: object
  ) {
    super({
      name: name,
      label: label,
      type: "schema",
    });
    this.objectShape = objectShape;
    this.field = new ObjectField(new Field({ name, label }), objectShape);
    this.validations.push({
      name: "schema",
      function: (value) => {
        if (typeof value !== "object") {
          throw new Error(`${this.label} must be a schema object.`);
        }
      },
    });
  }

  get schema() {
    return this.objectShape;
  }
}

export function schema(shape: object) {
  return new Schema({ name: "schema", label: "Schema" }, shape);
}
