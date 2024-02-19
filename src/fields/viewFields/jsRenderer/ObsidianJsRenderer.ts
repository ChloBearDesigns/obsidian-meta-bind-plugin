import type MetaBindPlugin from '../../../main';
import { Component, TFile } from 'obsidian';
import { type API } from 'jsEngine/api/API';
import { getJsEnginePluginAPI } from '../../../utils/ObsUtils';
import { type JsExecution } from 'jsEngine/engine/JsExecution';
import { type ResultRenderer } from 'jsEngine/engine/ResultRenderer';
import { type IJsRenderer } from './IJsRenderer';
import { DomHelpers } from '../../../utils/Utils';

export class ObsidianJsRenderer implements IJsRenderer {
	readonly plugin: MetaBindPlugin;
	containerEl: HTMLElement;
	file: TFile;
	jsEngine: API;
	code: string;
	renderComponent: Component;

	constructor(plugin: MetaBindPlugin, containerEl: HTMLElement, filePath: string, code: string) {
		this.plugin = plugin;
		this.containerEl = containerEl;
		this.code = code;

		const file = plugin.app.vault.getAbstractFileByPath(filePath);
		if (!(file instanceof TFile)) {
			throw new Error(`File not found: ${filePath}`);
		}
		this.file = file;

		this.jsEngine = getJsEnginePluginAPI(this.plugin);
		this.renderComponent = new Component();
	}

	private async evaluateCode(context: Record<string, unknown>): Promise<JsExecution> {
		return this.jsEngine.internal.execute({
			code: this.code,
			context: {
				file: this.file,
				line: 0,
				metadata: this.plugin.app.metadataCache.getFileCache(this.file),
			},
			container: this.containerEl,
			component: this.renderComponent,
			contextOverrides: context,
		});
	}

	async evaluate(context: Record<string, unknown>): Promise<unknown> {
		try {
			DomHelpers.empty(this.containerEl);
			DomHelpers.removeClass(this.containerEl, 'mb-error');

			this.renderComponent.unload();
			this.renderComponent = new Component();
			this.renderComponent.load();

			const execution = await this.evaluateCode(context);
			const renderer = this.jsEngine.internal.createRenderer(
				this.containerEl,
				this.file.path,
				this.renderComponent,
			);
			await renderer.render(execution.result);

			return renderer.convertToSimpleObject(execution.result);
		} catch (e) {
			if (e instanceof Error) {
				this.containerEl.innerText = e.message;
				DomHelpers.addClass(this.containerEl, 'mb-error');
			}

			return undefined;
		}
	}

	unload(): void {
		this.renderComponent.unload();
	}
}