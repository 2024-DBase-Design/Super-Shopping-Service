export class ValidationRule {
  private readonly validationTest: (value: any, args?: any) => string;

  constructor(validationTest: (value: any, args?: any) => string) {
      this.validationTest = validationTest;
  }

  public checkValue(value: any, args?: any): string {
      return this.validationTest(value, args);
  }
}

export const Required: ValidationRule = new ValidationRule((value: any, fieldName: string = "this field") => {
  if (value || typeof value === typeof Boolean) {
    return '';
  } else {
    return `${fieldName} is required`;
  }
});

export const Email: ValidationRule = new ValidationRule((value: string) => {
  const regexp = new RegExp(
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
  if (regexp.test(value)) {
    return '';
  } else {
    return `${value} is not a valid email.`;
  }
});

export const ConfirmPassword: ValidationRule = new ValidationRule((value: any, originalPassword: string) => {
  if (value === originalPassword) {
    return '';
  } else {
    return `These passwords do not match.`;
  }
});

export const enum ValidationRuleEnum {
  Required = 'required',
  Email = 'email',
  ConfirmPassword = 'confirm password'
}

export let ValidationRuleDictionary: Map<String, ValidationRule> = new Map();
ValidationRuleDictionary.set(ValidationRuleEnum.Required, Required);
ValidationRuleDictionary.set(ValidationRuleEnum.Email, Email);
