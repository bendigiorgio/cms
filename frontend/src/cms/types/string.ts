import { Field } from "../field";
import {
  EmailValidation,
  IPv4Validation,
  IPv6Validation,
  LengthValidation,
  MaxLengthValidation,
  MinLengthValidation,
  RegexValidation,
  StringValidationStates,
  URLValidation,
  UUIDValidation,
} from "../helpers/validationTypes";

const regexEmail =
  /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

const regexUrl =
  /^((https?|ftp):)?\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i;

const regexUUID =
  /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;

const regexIpv4 =
  /^(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))$/;

const regexIpv6 =
  /^(([a-f0-9]{1,4}:){7}|::([a-f0-9]{1,4}:){0,6}|([a-f0-9]{1,4}:){1}:([a-f0-9]{1,4}:){0,5}|([a-f0-9]{1,4}:){2}:([a-f0-9]{1,4}:){0,4}|([a-f0-9]{1,4}:){3}:([a-f0-9]{1,4}:){0,3}|([a-f0-9]{1,4}:){4}:([a-f0-9]{1,4}:){0,2}|([a-f0-9]{1,4}:){5}:([a-f0-9]{1,4}:){0,1})([a-f0-9]{1,4}|(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2})))$/;

export function create(field: Field<any, Partial<StringValidationStates>>) {
  return new StringField(field);
}

export class StringField
  extends Field<string, StringValidationStates>
  implements StringField
{
  constructor(field: Field<any, StringValidationStates>) {
    super({
      name: field["name"],
      label: field["label"],
      type: "string",
    });

    this.validations.push({
      name: "string",
      function: (value) => {
        if (typeof value !== "string") {
          throw new Error(`${this.label} must be a string.`);
        }
      },
    });
  }

  minLength(length: number, message?: string) {
    if (this.appliedValidations.minLength) {
      throw new Error(`${this.label}'s min length is already set.`);
    }
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
    this.appliedValidations.minLength = true;
    return this;
  }

  maxLength(length: number, message?: string) {
    if (this.appliedValidations.maxLength) {
      throw new Error(`${this.label}'s max length is already set.`);
    }
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
    if (this.appliedValidations.length) {
      throw new Error(`${this.label}'s length is already set.`);
    }
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

  email(message?: string) {
    this.validations.push({
      name: "email",
      function: (value) => {
        if (!regexEmail.test(value!)) {
          const errorMessage =
            message?.replace("{value}", String(value)) ||
            `${this.label} must be an email address.`;
          throw new Error(errorMessage);
        }
      },
    });
    return this;
  }

  url(message?: string) {
    if (this.appliedValidations.url) {
      throw new Error(`${this.label}'s URL validation is already set.`);
    }
    this.validations.push({
      name: "url",
      function: (value) => {
        if (regexUrl.test(value!)) {
          const errorMessage =
            message?.replace("{value}", String(value)) ||
            `${this.label} must be a URL.`;
          throw new Error(errorMessage);
        }
      },
    });
    return this;
  }

  uuid(message?: string) {
    if (this.appliedValidations.uuid) {
      throw new Error(`${this.label}'s UUID validation is already set.`);
    }
    this.validations.push({
      name: "uuid",
      function: (value) => {
        if (regexUUID.test(value!)) {
          const errorMessage =
            message?.replace("{value}", String(value)) ||
            `${this.label} must be a UUID.`;
          throw new Error(errorMessage);
        }
      },
    });
    return this;
  }

  ipv4(message?: string) {
    if (this.appliedValidations.ipv4) {
      throw new Error(`${this.label}'s IPv4 validation is already set.`);
    }
    this.validations.push({
      name: "ipv4",
      function: (value) => {
        if (regexIpv4.test(value!)) {
          const errorMessage =
            message?.replace("{value}", String(value)) ||
            `${this.label} must be an IPv4 address.`;
          throw new Error(errorMessage);
        }
      },
    });
    return this;
  }

  ipv6(message?: string) {
    if (this.appliedValidations.ipv6) {
      throw new Error(`${this.label}'s IPv6 validation is already set.`);
    }
    this.validations.push({
      name: "ipv6",
      function: (value) => {
        if (regexIpv6.test(value!)) {
          const errorMessage =
            message?.replace("{value}", String(value)) ||
            `${this.label} must be an IPv6 address.`;
          throw new Error(errorMessage);
        }
      },
    });
    return this;
  }

  regex(regex: RegExp, message?: string) {
    if (this.appliedValidations.regex) {
      throw new Error(`${this.label}'s regex validation is already set.`);
    }
    this.validations.push({
      name: "regex",
      function: (value) => {
        if (!regex.test(value!)) {
          const errorMessage =
            message?.replace("{value}", String(value)) ||
            `${this.label} must match the regex ${regex}.`;
          throw new Error(errorMessage);
        }
      },
    });
    return this;
  }
}
