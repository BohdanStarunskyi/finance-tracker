import { ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, registerDecorator } from "class-validator";

@ValidatorConstraint({ name: 'containsEmoji', async: false })
export class ContainsEmojiConstraint implements ValidatorConstraintInterface {
    validate(text: string, args: ValidationArguments) {
        const emojiRegex = /[\p{Emoji_Modifier_Base}\p{Emoji_Modifier}\p{Emoji_Presentation}\p{Emoji}\uFE0F]/gu;
        return emojiRegex.test(text);
    }

    defaultMessage(args: ValidationArguments) {
        return 'The text does not contain any emoji!';
    }
}

export function IsEmoji(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: 'isEmoji',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: ContainsEmojiConstraint,
        });
    };
}
