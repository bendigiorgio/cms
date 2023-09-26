import { Field } from "../field";
import { DateValidationStates } from "../helpers/validationTypes";

export function create(
  field: Field<any, DateValidationStates>,
  { coerceDate }: { coerceDate?: boolean }
) {
  return new DateField(field, { coerceDate });
}

export class DateField
  extends Field<Date | string, DateValidationStates>
  implements DateField
{
  constructor(
    field: Field<any, DateValidationStates>,
    {
      coerceDate = false,
    }: {
      coerceDate?: boolean;
    }
  ) {
    super({
      name: field["name"],
      label: field["label"],
      type: "date",
    });
    if (coerceDate) {
      this.validations.push({
        name: "date",
        function: (value) => {
          if (!(Object.prototype.toString.call(value) === "[object Date]")) {
            if (!value) {
              throw new Error(`${this.label} must be a date.`);
            }
            const date = new Date(value);
            if (date.toString() === "Invalid Date") {
              throw new Error(`${this.label} must be a date.`);
            }
          }
        },
      });
    } else {
      this.validations.push({
        name: "date",
        function: (value) => {
          if (!(Object.prototype.toString.call(value) === "[object Date]")) {
            throw new Error(`${this.label} must be a date.`);
          }
        },
      });
    }
  }

  min(minDate: Date, message?: string) {
    if (this.appliedValidations.min) {
      throw new Error(`${this.label}'s min is already set.`);
    }
    this.validations.push({
      name: "min",
      function: (value) => {
        if (this.appliedValidations.min) {
          throw new Error(`${this.label}'s min is already set.`);
        }
        const errorMessage =
          message?.replace("{value}", String(value)) ||
          `${this.label} must be after ${minDate}.`;
        if (value! < minDate) {
          throw new Error(errorMessage);
        }
      },
    });
    this.appliedValidations.min = true;
    return this;
  }

  max(maxDate: Date, message?: string) {
    if (this.appliedValidations.max) {
      throw new Error(`${this.label}'s max is already set.`);
    }
    this.validations.push({
      name: "max",
      function: (value) => {
        if (this.appliedValidations.max) {
          throw new Error(`${this.label}'s max is already set.`);
        }
        const errorMessage =
          message?.replace("{value}", String(value)) ||
          `${this.label} must be before ${maxDate}.`;
        if (value! > maxDate) {
          throw new Error(errorMessage);
        }
      },
    });
    this.appliedValidations.max = true;
    return this;
  }
}
