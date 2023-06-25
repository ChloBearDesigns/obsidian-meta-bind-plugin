import { ToggleInputField } from './fields/ToggleInputField';
import { InputFieldMDRC, RenderChildType } from '../renderChildren/InputFieldMDRC';
import { TextInputField } from './fields/TextInputField';
import { SliderInputField } from './fields/SliderInputField';
import { TextAreaInputField } from './fields/TextAreaInputField';
import { SelectInputField } from './fields/SelectInputField';
import { MultiSelectInputField } from './fields/MultiSelectInputField';
import { DateInputField } from './fields/DateInputField';
import { TimeInputField } from './fields/TimeInputField';
import { AbstractInputField } from './AbstractInputField';
import { InputFieldType } from '../parsers/InputFieldDeclarationParser';
import { DatePickerInputField } from './fields/DatePicker/DatePickerInputField';
import { NumberInputField } from './fields/NumberInputField';
import { SuggestInputField } from './fields/Suggest/SuggestInputField';
import { ErrorLevel, MetaBindParsingError } from '../utils/errors/MetaBindErrors';
import { EditorInputField } from './fields/Editor/EditorInputField';
import { ImageSuggestInputField } from './fields/ImageSuggest/ImageSuggestInputField';
import MetaBindPlugin from '../main';
import { ProgressBarInputField } from './fields/ProgressBar/ProgressBarInputField';
import { InlineSelectInputField } from './fields/InlineSelectInputField';
import { ListInputField } from './fields/List/ListInputField';

export class InputFieldFactory {
	static allowCodeBlockMap: Record<string, { block: boolean; inline: boolean }> = {
		[InputFieldType.TOGGLE]: {
			block: ToggleInputField.allowBlock,
			inline: ToggleInputField.allowInline,
		},
		[InputFieldType.SLIDER]: {
			block: SliderInputField.allowBlock,
			inline: SliderInputField.allowInline,
		},
		[InputFieldType.TEXT]: {
			block: TextInputField.allowBlock,
			inline: TextInputField.allowInline,
		},
		[InputFieldType.TEXT_AREA]: {
			block: TextAreaInputField.allowBlock,
			inline: TextAreaInputField.allowInline,
		},
		[InputFieldType.SELECT]: {
			block: SelectInputField.allowBlock,
			inline: SelectInputField.allowInline,
		},
		[InputFieldType.MULTI_SELECT]: {
			block: MultiSelectInputField.allowBlock,
			inline: MultiSelectInputField.allowInline,
		},
		[InputFieldType.DATE]: {
			block: DateInputField.allowBlock,
			inline: DateInputField.allowInline,
		},
		[InputFieldType.TIME]: {
			block: TimeInputField.allowBlock,
			inline: TimeInputField.allowInline,
		},
		[InputFieldType.DATE_PICKER]: {
			block: DatePickerInputField.allowBlock,
			inline: DatePickerInputField.allowInline,
		},
		[InputFieldType.NUMBER]: {
			block: NumberInputField.allowBlock,
			inline: NumberInputField.allowInline,
		},
		[InputFieldType.SUGGESTER]: {
			block: SuggestInputField.allowBlock,
			inline: SuggestInputField.allowInline,
		},
		[InputFieldType.EDITOR]: {
			block: EditorInputField.allowBlock,
			inline: EditorInputField.allowInline,
		},
		[InputFieldType.IMAGE_SUGGESTER]: {
			block: ImageSuggestInputField.allowBlock,
			inline: ImageSuggestInputField.allowInline,
		},
		[InputFieldType.PROGRESS_BAR]: {
			block: ProgressBarInputField.allowBlock,
			inline: ProgressBarInputField.allowInline,
		},
		[InputFieldType.INLINE_SELECT]: {
			block: InlineSelectInputField.allowBlock,
			inline: InlineSelectInputField.allowInline,
		},
		[InputFieldType.LIST]: {
			block: ListInputField.allowBlock,
			inline: ListInputField.allowInline,
		},
	};

	static createInputField(inputFieldType: InputFieldType, args: { renderChildType: RenderChildType; inputFieldMDRC: InputFieldMDRC }): AbstractInputField | undefined {
		if (inputFieldType !== InputFieldType.INVALID) {
			InputFieldFactory.checkRenderChildTypeAllowed(inputFieldType, args.renderChildType, args.inputFieldMDRC.plugin);
		}

		if (inputFieldType === InputFieldType.TOGGLE) {
			return new ToggleInputField(args.inputFieldMDRC);
		} else if (inputFieldType === InputFieldType.SLIDER) {
			return new SliderInputField(args.inputFieldMDRC);
		} else if (inputFieldType === InputFieldType.TEXT) {
			return new TextInputField(args.inputFieldMDRC);
		} else if (inputFieldType === InputFieldType.TEXT_AREA) {
			return new TextAreaInputField(args.inputFieldMDRC);
		} else if (inputFieldType === InputFieldType.SELECT) {
			return new SelectInputField(args.inputFieldMDRC);
		} else if (inputFieldType === InputFieldType.MULTI_SELECT) {
			return new MultiSelectInputField(args.inputFieldMDRC);
		} else if (inputFieldType === InputFieldType.DATE) {
			return new DateInputField(args.inputFieldMDRC);
		} else if (inputFieldType === InputFieldType.TIME) {
			return new TimeInputField(args.inputFieldMDRC);
		} else if (inputFieldType === InputFieldType.DATE_PICKER) {
			return new DatePickerInputField(args.inputFieldMDRC);
		} else if (inputFieldType === InputFieldType.NUMBER) {
			return new NumberInputField(args.inputFieldMDRC);
		} else if (inputFieldType === InputFieldType.SUGGESTER) {
			return new SuggestInputField(args.inputFieldMDRC);
		} else if (inputFieldType === InputFieldType.EDITOR) {
			return new EditorInputField(args.inputFieldMDRC);
		} else if (inputFieldType === InputFieldType.IMAGE_SUGGESTER) {
			return new ImageSuggestInputField(args.inputFieldMDRC);
		} else if (inputFieldType === InputFieldType.PROGRESS_BAR) {
			return new ProgressBarInputField(args.inputFieldMDRC);
		} else if (inputFieldType === InputFieldType.INLINE_SELECT) {
			return new InlineSelectInputField(args.inputFieldMDRC);
		} else if (inputFieldType === InputFieldType.LIST) {
			return new ListInputField(args.inputFieldMDRC);
		}

		return undefined;
	}

	static checkRenderChildTypeAllowed(inputFieldType: InputFieldType, renderChildType: RenderChildType, plugin: MetaBindPlugin): void {
		if (plugin.settings.ignoreCodeBlockRestrictions) {
			return;
		}

		const allowCodeBlock: { block: boolean; inline: boolean } = InputFieldFactory.allowCodeBlockMap[inputFieldType];
		if (renderChildType === RenderChildType.BLOCK && !allowCodeBlock.block) {
			throw new MetaBindParsingError(ErrorLevel.CRITICAL, 'can not create input field', `'${inputFieldType}' is not allowed as code block`);
		}
		if (renderChildType === RenderChildType.INLINE && !allowCodeBlock.inline) {
			throw new MetaBindParsingError(ErrorLevel.CRITICAL, 'can not create input field', `'${inputFieldType}' is not allowed as inline code block`);
		}
	}
}
