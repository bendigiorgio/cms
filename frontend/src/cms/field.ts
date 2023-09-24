import { BaseField, BaseValidationStates } from "./helpers/validationTypes";
import { ArrayField } from "./types/array";
import { NumberField } from "./types/number";
import { ObjectField } from "./types/object";
import { StringField } from "./types/string";

type ValidationFunction<T> = (value?: T) => void;
type FieldValidation<T> = {
  name: string;
  function: ValidationFunction<T>;
};

export class Field<T, K extends BaseValidationStates> implements BaseField {
  protected validations: FieldValidation<T>[] = [];
  protected appliedValidations: K = {} as K;
  protected name: string;
  protected label: string;
  protected type!: string;

  constructor({
    name,
    label,
    type,
  }: {
    name: string;
    label: string;
    type?: string;
  }) {
    this.name = name;
    this.label = label;
    if (type) {
      this.type = type;
    }
  }

  validate(value: T) {
    for (const validator of this.validations) {
      validator.function(value);
    }
  }

  required(message?: string) {
    if (this.appliedValidations.required) {
      throw new Error(`${this.label} is already required.`);
    }
    this.validations.push({
      name: "required",
      function: (value?: T) => {
        const errorMessage =
          message?.replace("{value}", String(value)) ||
          `${this.label} is required.`;
        if (!value) {
          throw new Error(errorMessage);
        }
      },
    });
    this.appliedValidations.required = true;
    return this;
  }
}

class CMSField {
  private _name: string;
  private _label: string;
  field: Field<any, Partial<BaseValidationStates>>;

  constructor({ name, label }: { name: string; label: string }) {
    this._name = name;
    this._label = label;
    this.field = new Field({ name, label });
  }
  get name() {
    return this._name;
  }
  get label() {
    return this._label;
  }

  string() {
    return new StringField(this.field);
  }

  number() {
    return new NumberField(this.field);
  }

  array() {
    return new ArrayField(this.field);
  }

  object(objectShape: object) {
    return new ObjectField(this.field, objectShape);
  }
}

export function cms({ name, label }: { name: string; label: string }) {
  return new CMSField({ name, label });
}
