import { AbstractInputField } from './AbstractInputField';
import { TextComponent } from 'obsidian';
import { numberToString } from '../utils/Utils';
import { ErrorLevel, MetaBindInternalError, MetaBindValueError } from '../utils/errors/MetaBindErrors';

export class NumberInputField extends AbstractInputField {
	numberComponent: TextComponent | undefined;

	getValue(): number | undefined {
		if (!this.numberComponent) {
			return undefined;
		}
		const value = parseFloat(this.numberComponent.getValue());
		return isNaN(value) ? 0 : value;
	}

	setValue(value: any): void {
		if (!this.numberComponent) {
			return;
		}

		if (value != null && (typeof value == 'number' || typeof value == 'string')) {
			this.numberComponent.setValue(numberToString(value));
		} else {
			console.warn(new MetaBindValueError(ErrorLevel.WARNING, 'failed to set value', `invalid value '${value}' at numberInputField ${this.renderChild.uuid}`));
			this.numberComponent.setValue(this.getDefaultValue());
		}
	}

	isEqualValue(value: any): boolean {
		return this.getValue() == value;
	}

	getDefaultValue(): any {
		return 0;
	}

	getHtmlElement(): HTMLElement {
		if (!this.numberComponent) {
			throw new MetaBindInternalError(ErrorLevel.WARNING, 'failed to get html element for input field', "container is undefined, field hasn't been rendered yet");
		}

		return this.numberComponent.inputEl;
	}

	render(container: HTMLDivElement): void {
		console.debug(`meta-bind | NumberInputField >> render ${this.renderChild.uuid}`);

		const component = new TextComponent(container);
		component.inputEl.type = 'number';
		component.setValue(numberToString(this.renderChild.getInitialValue()));
		component.onChange(value => {
			const n = parseFloat(value);
			this.onValueChange(isNaN(n) ? 0 : n);
		});
		this.numberComponent = component;
	}

	public destroy(): void {}
}