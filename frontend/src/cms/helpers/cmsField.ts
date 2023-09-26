import { Field } from "../field";
import { BaseValidationStates } from "./validationTypes";
import { create as createArrField } from "../types/array";
import { create as createBoolField } from "../types/boolean";
import { create as createNumField } from "../types/number";
import { create as createObjField } from "../types/object";
import { RichTextField } from "../types/richText";
import { create as createStrField } from "../types/string";

export class CMSField {
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
    return createStrField(this.field);
  }

  number() {
    return createNumField(this.field);
  }

  array() {
    return createArrField(this.field);
  }

  object(objectShape: object) {
    return createObjField(this.field, objectShape);
  }

  boolean() {
    return createBoolField(this.field);
  }

  richText() {
    return new RichTextField(this.field);
  }

  relatesTo(relation: string[]) {
    this.field.setRelations(relation);
    return this.field;
  }
}
