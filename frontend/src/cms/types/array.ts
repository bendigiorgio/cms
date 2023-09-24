import { Field } from "../field";
import { NumberField } from "./number";
import { ObjectField } from "./object";
import { StringField } from "./string";

export function create(field: Field<any>) {
  return new ArrayField(field);
}

export class ArrayField extends Field<any[]> {
  protected subType?: string;
  protected subField?: Field<any> | StringField | ObjectField | ArrayField;

  constructor(field: Field<any>) {
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

  minLength(length: number, message?: string) {
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
    return this;
  }

  maxLength(length: number, message?: string) {
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
    return this;
  }

  length(length: number, message?: string) {
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
    return this;
  }

  unique(message?: string) {
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
    return this;
  }

  of(type: string) {
    this.validations.push({
      name: "of",
      function: (value) => {
        for (const item of value!) {
          if (typeof item !== type) {
            throw new Error(`${this.label} must be an array of ${type}s.`);
          }
        }
      },
    });
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
}
