import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

interface IsBase64Options extends ValidationOptions {
  message?: string;
}

export function IsBase64(validationOptions?: IsBase64Options) {
  return function (target: object, propertyName: string) {
    registerDecorator({
      name: 'isBase64',
      target: target.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          args;
          if (typeof value !== 'string') {
            return false;
          }
          try {
            return btoa(atob(value)) === value;
          } catch (err) {
            return false;
          }
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be a valid Base64 string`;
        },
      },
    });
  };
}
