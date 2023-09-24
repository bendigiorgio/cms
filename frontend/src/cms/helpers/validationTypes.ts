// Helper to remove available methods from the class

export type BaseValidations = keyof BaseField;

export type StringFieldValidations = keyof StringField;

export type NumberFieldValidations = keyof NumberField;

export type StringValidationStates = {
  [key in StringFieldValidations]?: true;
} & BaseValidationStates;

export type NumberValidationStates = {
  [key in NumberFieldValidations]?: true;
} & BaseValidationStates;

export type BaseValidationStates = {
  [key in BaseValidations]?: true;
};

// Base Field validations
export interface RequiredValidation {
  required(message?: string): this;
}
export interface BaseField extends RequiredValidation {}

/**
 * STRING FIELD
 */

// Individual validation interfaces for StringField
export interface MinLengthValidation {
  minLength(length: number, message?: string): this;
}
export interface MaxLengthValidation {
  maxLength(length: number, message?: string): this;
}
export interface LengthValidation {
  length(length: number, message?: string): this;
}
export interface EmailValidation {
  email(message?: string): this;
}
export interface URLValidation {
  url(message?: string): this;
}
export interface UUIDValidation {
  uuid(message?: string): this;
}
export interface IPv4Validation {
  ipv4(message?: string): this;
}
export interface IPv6Validation {
  ipv6(message?: string): this;
}
export interface RegexValidation {
  regex(pattern: RegExp, message?: string): this;
}

export interface StringField
  extends BaseField,
    MinLengthValidation,
    MaxLengthValidation,
    LengthValidation,
    EmailValidation,
    URLValidation,
    UUIDValidation,
    IPv4Validation,
    IPv6Validation,
    RegexValidation {}

/**
 * NUMBER FIELD
 */

export interface MinValidation {
  min(min: number, message?: string): this;
}

export interface MaxValidation {
  max(max: number, message?: string): this;
}

export interface IntegerValidation {
  integer(message?: string): this;
}

export interface PositiveValidation {
  positive(message?: string): this;
}

export interface NegativeValidation {
  negative(message?: string): this;
}

export interface NumberField
  extends BaseField,
    MinValidation,
    MaxValidation,
    IntegerValidation,
    PositiveValidation,
    NegativeValidation {}
