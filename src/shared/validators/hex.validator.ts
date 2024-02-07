import { ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, registerDecorator } from 'class-validator';

@ValidatorConstraint({ name: 'isHexString6', async: false })
export class IsHexString6Constraint implements ValidatorConstraintInterface {
  validate(text: string, args: ValidationArguments) {
    if (text.length !== 6 || !/^[0-9a-fA-F]{6}$/.test(text)) {
      return false;
    }
    return true;
  }

  defaultMessage(args: ValidationArguments) {
    return 'Value is not a valid hex string with a length of 6 characters';
  }
}

export function IsHexString6(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isHexString6',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: IsHexString6Constraint,
    });
  };
}
