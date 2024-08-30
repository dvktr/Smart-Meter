import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

interface IsValidDateOptions extends ValidationOptions {
  message?: string;
}

export function IsValidDate(validationOptions?: IsValidDateOptions) {
  return function (target: object, propertyName: string) {
    registerDecorator({
      name: 'isValidDate',
      target: target.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          args;
          if (typeof value !== 'string') {
            return false;
          }

          const [year, month, day] = value.split('-').map(Number);

          if (!year || !month || !day) {
            return false;
          }

          const date = new Date(year, month - 1, day);
          return (
            date.getFullYear() === year &&
            date.getMonth() === month - 1 &&
            date.getDate() === day
          );
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be a valid date`;
        },
      },
    });
  };
}
