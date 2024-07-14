import type { IMetadataSubscription } from 'packages/core/src/metadata/IMetadataSubscription';

import type { Metadata } from 'packages/core/src/metadata/MetadataSource';

export interface IMetadataCacheItem {
	subscriptions: IMetadataSubscription[];

	/**
	 * The cycles since the last change to the cache by the plugin.
	 */
	cyclesSinceInternalChange: number;
	/**
	 * Whether the cache was changed by the plugin. If this is true, the frontmatter should be updated.
	 */
	pendingInternalChange: boolean;
	/**
	 * The cycles that the cache has been inactive, meaning no listener registered to it.
	 */
	cyclesSinceInactive: number;
	/**
	 * Whether the there are no subscribers to the cache.
	 */
	inactive: boolean;
}

export interface FilePathMetadataCacheItem extends IMetadataCacheItem {
	storagePath: string;
	data: Metadata;
}

export interface GlobalMetadataCacheItem extends IMetadataCacheItem {
	data: Metadata;
}
