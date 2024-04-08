import { API } from 'packages/core/src/api/API';
import { PublishFieldMDRC } from 'packages/publish/src/PublishFieldMDRC';
import { type MetaBindPublishPlugin } from 'packages/publish/src/main';
import type { Component } from 'obsidian/publish';
import { type Mountable } from 'packages/core/src/utils/Mountable';

export interface ComponentLike {
	addChild(child: Component): void;
}

export class PublishAPI extends API<MetaBindPublishPlugin> {
	constructor(plugin: MetaBindPublishPlugin) {
		super(plugin);
	}

	public wrapInMDRC(field: Mountable, containerEl: HTMLElement, component: ComponentLike): PublishFieldMDRC {
		const mdrc = new PublishFieldMDRC(this.plugin, field, containerEl);
		component.addChild(mdrc);

		return mdrc;
	}
}
