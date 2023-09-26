// Base Field validations
export interface RequiredValidation {
  required(message?: string): this;
}
export interface BaseField extends RequiredValidation {}

export type BaseValidations = keyof BaseField;

export type BaseValidationStates = {
  [key in BaseValidations]?: true;
};

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

export type StringFieldValidations = keyof StringField;

export type StringValidationStates = {
  [key in StringFieldValidations]?: true;
} & BaseValidationStates;

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

export type NumberFieldValidations = keyof NumberField;

export type NumberValidationStates = {
  [key in NumberFieldValidations]?: true;
} & BaseValidationStates;

/**
 * OBJECT FIELD
 **/

export interface ShapeValidation {
  shape(shape: object, message?: string): this;
}

export interface ObjectField extends BaseField, ShapeValidation {}

type ObjectFieldValidations = keyof ObjectField;

export type ObjectValidationStates = {
  [key in ObjectFieldValidations]?: true;
} & BaseValidationStates;

/**
 * ARRAY FIELD
 */

export interface MinLengthValidation {
  minLength(length: number, message?: string): this;
}
export interface MaxLengthValidation {
  maxLength(length: number, message?: string): this;
}
export interface UniqueValidation {
  unique(message?: string): this;
}
export interface OfValidation {
  of(type: string, message?: string): this;
}

export interface ArrayField
  extends BaseField,
    MinLengthValidation,
    MaxLengthValidation,
    LengthValidation,
    UniqueValidation,
    OfValidation {}

export type ArrayFieldValidations = keyof ArrayField;

export type ArrayValidationStates = {
  [key in ArrayFieldValidations]?: true;
} & BaseValidationStates;

/**
 * BOOLEAN FIELD
 */

export interface BooleanField extends BaseField {}

export type BooleanFieldValidations = keyof BooleanField;

export type BooleanValidationStates = {
  [key in BooleanFieldValidations]?: true;
} & BaseValidationStates;

/**
 * DATE FIELD
 */

export interface MinDateValidation {
  min(date: Date, message?: string): this;
}
export interface MaxDateValidation {
  max(date: Date, message?: string): this;
}

export interface DateField
  extends BaseField,
    MinDateValidation,
    MaxDateValidation {}

export type DateFieldValidations = keyof DateField;

export type DateValidationStates = {
  [key in DateFieldValidations]?: true;
} & BaseValidationStates;

/**
 * JSON FIELD
 */

export interface JSONField extends BaseField {}

/**
 * ENUM FIELD
 */

export interface EnumField extends BaseField {}

/**
 * MEDIA FIELD
 */

export interface FileTypeValidation {
  fileType(type: string, message?: string): this;
}

export interface MaxFileSizeValidation {
  maxSize(size: number, message?: string): this;
}

export interface MediaField
  extends BaseField,
    FileTypeValidation,
    MaxFileSizeValidation {}

export type MediaFieldValidations = keyof MediaField;

export type MediaValidationStates = {
  [key in MediaFieldValidations]?: true;
} & BaseValidationStates;

/**
 * RICH TEXT FIELD
 */

export interface RichTextField extends BaseField {}

export type RichTextFieldValidations = keyof RichTextField;

export type RichTextValidationStates = {
  [key in RichTextFieldValidations]?: true;
} & BaseValidationStates;
