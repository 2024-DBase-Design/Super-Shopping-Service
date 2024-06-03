export class ValidationRule {
  fieldName: string = 'this field';
  private readonly validationTest: (value: any, fieldName: string) => string;

  constructor(validationTest: (value: any, fieldName: string) => string) {
    this.validationTest = validationTest;
  }

  public checkValue(value: any): string {
    return this.validationTest(value, this.fieldName);
  }
}

export const Required: ValidationRule = new ValidationRule((value: any, fieldName: string) => {
  if (value || typeof value === typeof Boolean) {
    return '';
  } else {
    return `${fieldName} is required`;
  }
});

export const Email: ValidationRule = new ValidationRule((value: string, fieldName: string) => {
  const regexp = new RegExp(
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
  if (regexp.test(value)) {
    return '';
  } else {
    return `${value} is not a valid email`;
  }
});

export const enum ValidationRuleEnum {
  Required = 'required',
  Email = 'email'
}

export let ValidationRuleDictionary: Map<String, ValidationRule> = new Map();
ValidationRuleDictionary.set(ValidationRuleEnum.Required, Required);
ValidationRuleDictionary.set(ValidationRuleEnum.Email, Email);
