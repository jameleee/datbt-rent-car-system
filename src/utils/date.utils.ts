import {
  ValidationArguments,
  ValidationOptions,
  registerDecorator,
} from 'class-validator';

export function IsAfterDate(
  property: string,
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isAfterDate',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: Date, args: ValidationArguments) {
          console.log(object);
          console.log(propertyName);
          const [comparisonDateProperty] = args.constraints;
          const comparisonDate = (args.object as any)[comparisonDateProperty];

          if (!(value instanceof Date) || !(comparisonDate instanceof Date)) {
            return false;
          }
          return comparisonDate < value;
        },

        defaultMessage(args: ValidationArguments) {
          const [comparisonDateProperty] = args.constraints;
          return `${args.property} must be after the ${comparisonDateProperty}`;
        },
      },
    });
  };
}
