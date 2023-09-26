import { BaseField, BaseValidationStates } from "./helpers/validationTypes";

import type React from "react";

type ValidationFunction<T> = (value?: T) => void;
type FieldValidation<T> = {
  name: string;
  function: ValidationFunction<T>;
};

interface ComponentType {
  name: string;
  component:
    | React.FC
    | React.ComponentClass
    | React.Component
    | React.JSX.Element;
}

export class Field<T, K extends BaseValidationStates> implements BaseField {
  protected validations: FieldValidation<T>[] = [];
  protected appliedValidations: K = {} as K;
  protected _relations?: string[];
  protected _name: string;
  protected _label: string;
  protected _type!: string;
  protected _initialValue?: T;
  protected _component?: ComponentType;

  constructor({
    name,
    label,
    type,
  }: {
    name: string;
    label: string;
    type?: string;
  }) {
    this._name = name;
    this._label = label;
    if (type) {
      this._type = type;
    }
  }

  validate(value: T) {
    for (const validator of this.validations) {
      validator.function(value);
    }
  }

  required(message?: string) {
    if (this.appliedValidations.required) {
      throw new Error(`${this._label} is already required.`);
    }
    this.validations.push({
      name: "required",
      function: (value?: T) => {
        const errorMessage =
          message?.replace("{value}", String(value)) ||
          `${this._label} is required.`;
        if (!value) {
          throw new Error(errorMessage);
        }
      },
    });
    this.appliedValidations.required = true;
    return this;
  }

  setInitialValue(value: T) {
    this._initialValue = value;
    return this;
  }

  setRelations(relation: string[]) {
    for (const rel in relation) {
      if (this._relations?.includes(rel)) {
        throw new Error(`${this._label} already has a relation with ${rel}.`);
      }
    }

    if (!this._relations) {
      this._relations = [...relation];
    } else {
      this._relations = [...this._relations, ...relation];
    }

    return this;
  }

  setComponent(component: ComponentType) {
    this._component = component;
    return this;
  }

  get name() {
    return this._name;
  }

  get label() {
    return this._label;
  }

  get type() {
    return this._type;
  }

  get validationStates() {
    return this.appliedValidations;
  }

  get validationFunctions() {
    return this.validations;
  }

  get relations() {
    return this._relations;
  }

  get initialValue() {
    return this._initialValue;
  }

  get component() {
    return this._component;
  }
}
