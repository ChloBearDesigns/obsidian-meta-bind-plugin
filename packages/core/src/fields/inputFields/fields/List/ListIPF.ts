import { InputFieldArgumentType } from 'packages/core/src/config/FieldConfigs';
import { AbstractInputField } from 'packages/core/src/fields/inputFields/AbstractInputField';
import ListComponent from 'packages/core/src/fields/inputFields/fields/List/ListComponent.svelte';
import { type MBLiteral, parseUnknownToLiteralArray } from 'packages/core/src/utils/Literal';
import type { InputFieldSvelteComponent } from 'packages/core/src/fields/inputFields/InputFieldSvelteWrapper';

interface SvelteExports {
	pushValue: (value: MBLiteral) => void;
}

export class ListIPF extends AbstractInputField<MBLiteral[], MBLiteral[], SvelteExports> {
	protected filterValue(value: unknown): MBLiteral[] | undefined {
		return parseUnknownToLiteralArray(value);
	}

	protected getFallbackDefaultValue(): MBLiteral[] {
		return [];
	}

	protected getSvelteComponent(): InputFieldSvelteComponent<MBLiteral[], SvelteExports> {
		// @ts-ignore
		return ListComponent;
	}

	protected rawMapValue(value: MBLiteral[]): MBLiteral[] {
		return value;
	}

	protected rawReverseMapValue(value: MBLiteral[]): MBLiteral[] | undefined {
		return value;
	}

	protected getMountArgs(): Record<string, unknown> {
		return {
			placeholder: this.mountable.getArgument(InputFieldArgumentType.PLACEHOLDER)?.value ?? 'New Entry...',
			limit: this.mountable.getArgument(InputFieldArgumentType.LIMIT)?.value,
			multiLine: this.mountable.getArgument(InputFieldArgumentType.MULTI_LINE)?.value === true,
		};
	}
}
