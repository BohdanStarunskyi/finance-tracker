import { ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, registerDecorator } from "class-validator";

export class ContainsEmoji implements ValidatorConstraintInterface {
    validate(text: string, args: ValidationArguments) {
        const emojiRegex = /[\p{Emoji_Modifier_Base}\p{Emoji_Modifier}\p{Emoji_Presentation}\p{Emoji}\uFE0F]/gu;
        const emojis = text.match(emojiRegex);
        return emojis && emojis.length === 1;
    }

    defaultMessage(args: ValidationArguments) {
        return 'Text ($value) is not an emoji!';
    }
}

export function IsEmoji(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
      registerDecorator({
        name: 'isEmoji',
        target: object.constructor,
        propertyName: propertyName,
        options: validationOptions,
        validator: ContainsEmoji,
      });
    };
}