interface IKey {
	name?: string
	key?: string
	commonKey?: string
}
interface IStorage extends IKey {
	content?: any
	type?: 'local' | 'session'
	needListener?: boolean
	debug?: boolean
}

type StorageValue = string | number | boolean | object | null

interface StorageContent {
	dataType: string | null
	content: StorageValue
	type?: 'local' | 'session'
	dateTime: number
}

interface StorageItem {
	name: string
	content: StorageValue
}

interface StorageEventDetail {
	key: string
	newValue: string | null
	oldValue: string | null
	storageArea: Storage | null
}

export type { IStorage, StorageValue, StorageContent, StorageItem, StorageEventDetail, IKey }
