import { Field } from "../field";
import { RichTextValidationStates } from "../helpers/validationTypes";

export class RichTextField
  extends Field<object, RichTextValidationStates>
  implements RichTextField
{
  constructor(field: Field<any, RichTextValidationStates>) {
    super({
      name: field["name"],
      label: field["label"],
      type: "richText",
    });

    this.validations.push({
      name: "richText",
      function: (value) => {
        if (typeof value !== "object") {
          throw new Error(`${this.label} must be an object.`);
        }
      },
    });
  }

  getJSONB(value: object) {
    return JSON.stringify(value);
  }
}
