import { ViewFieldArgumentType } from 'packages/core/src/config/FieldConfigs';
import { ClassViewFieldArgument } from 'packages/core/src/fields/fieldArguments/viewFieldArguments/argumnets/ClassViewFieldArgument';
import { HiddenViewFieldArgument } from 'packages/core/src/fields/fieldArguments/viewFieldArguments/argumnets/HiddenViewFieldArgument';
import { RenderMarkdownViewFieldArgument } from 'packages/core/src/fields/fieldArguments/viewFieldArguments/argumnets/RenderMarkdownViewFieldArgument';
import { ErrorLevel, MetaBindParsingError } from 'packages/core/src/utils/errors/MetaBindErrors';

/**
 * Maps the view field argument types to the view field constructors.
 * Add new view field arguments here.
 */
export const VIEW_FIELD_ARGUMENT_MAP = {
	[ViewFieldArgumentType.RENDER_MARKDOWN]: RenderMarkdownViewFieldArgument,
	[ViewFieldArgumentType.HIDDEN]: HiddenViewFieldArgument,
	[ViewFieldArgumentType.CLASS]: ClassViewFieldArgument,
} as const;

export type ViewFieldArgumentMapType<T extends ViewFieldArgumentType> = T extends keyof typeof VIEW_FIELD_ARGUMENT_MAP
	? InstanceType<(typeof VIEW_FIELD_ARGUMENT_MAP)[T]>
	: undefined;

export type ViewFieldArgumentConstructorMapType<T extends ViewFieldArgumentType> =
	T extends keyof typeof VIEW_FIELD_ARGUMENT_MAP ? (typeof VIEW_FIELD_ARGUMENT_MAP)[T] : undefined;

export class ViewFieldArgumentFactory {
	static createViewFieldArgument(
		argumentIdentifier: ViewFieldArgumentType,
	): NonNullable<ViewFieldArgumentMapType<typeof argumentIdentifier>> {
		if (argumentIdentifier in VIEW_FIELD_ARGUMENT_MAP) {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
			const viewFieldConstructor: ViewFieldArgumentConstructorMapType<typeof argumentIdentifier> =
				// @ts-ignore Thanks to the `if` we know that the object has the property
				VIEW_FIELD_ARGUMENT_MAP[argumentIdentifier];

			if (viewFieldConstructor) {
				return new viewFieldConstructor();
			}
		}

		throw new MetaBindParsingError({
			errorLevel: ErrorLevel.WARNING,
			effect: 'can not crate view field argument',
			cause: `unknown argument '${argumentIdentifier}'`,
		});
	}
}
