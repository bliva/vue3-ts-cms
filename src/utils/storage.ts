import type { IStorage, StorageValue, StorageContent, StorageItem, StorageEventDetail, IKey } from '@/types'
import { validateNull } from '@/utils'
import { ACCOUNT_INFO } from '@/global/constants'

const keyName = `Fun-${import.meta.env.VITE_APP_NAME}-${import.meta.env.VITE_MODE_NAME}-`
const commonKeyName = `Fun-${import.meta.env.VITE_MODE_NAME}-`

class Storage {
	private static instance: Storage
	private listeners: Map<string, (detail: StorageEventDetail) => void> = new Map()

	private constructor() {
		this.initStorageListener()
	}

	public static getInstance(): Storage {
		if (!Storage.instance) {
			Storage.instance = new Storage()
		}
		return Storage.instance
	}

	/**
	 * 设置存储
	 * @param params 存储参数
	 */
	public set(params: IStorage): void {
		const { name, content, type = 'local', needListener = false, key, commonKey } = params
		const storageKey = this.generateKey(name, key, commonKey)

		const storageItem: StorageContent = {
			dataType: content === null ? null : typeof content,
			content,
			type,
			dateTime: new Date().getTime()
		}

		const stringifiedValue = JSON.stringify(storageItem)

		if (needListener) {
			this.dispatchStorageEvent(storageKey, stringifiedValue, type)
		}

		const storage = type === 'session' ? sessionStorage : localStorage
		storage.setItem(storageKey, stringifiedValue)
	}

	/**
	 * 获取存储
	 * @param params 获取参数
	 * @returns 存储的值或undefined
	 */
	public get(params: IStorage): StorageValue | undefined {
		const { name, debug = false, key, commonKey } = params
		const storageKey = this.generateKey(name, key, commonKey)

		// 尝试从sessionStorage获取，不存在则尝试localStorage
		const storedValue = sessionStorage.getItem(storageKey) ?? localStorage.getItem(storageKey)

		if (validateNull(storedValue)) return undefined

		try {
			if (storedValue) {
				const parsedValue = JSON.parse(storedValue) as StorageContent
				if (debug || key || commonKey) {
					return parsedValue
				}
				// 根据数据类型转换返回值
				switch (parsedValue.dataType) {
					case 'string':
						return parsedValue.content
					case 'number':
						return Number(parsedValue.content)
					case 'boolean':
						return Boolean(parsedValue.content)
					case 'object':
						return parsedValue.content
					default:
						return parsedValue.content
				}
			}
		} catch {
			return storedValue
		}
	}

	/**
	 * 移除存储
	 * @param params 移除参数
	 */
	public remove(params: IStorage): void {
		const { name, type = 'local', key, commonKey } = params
		const storageKey = this.generateKey(name, key, commonKey)

		const storage = type === 'session' ? sessionStorage : localStorage
		storage.removeItem(storageKey)
	}

	/**
	 * 获取所有存储项
	 * @param params 获取参数
	 * @returns 存储项数组
	 */
	public getAll(params: IStorage): StorageItem[] {
		const { type = 'local' } = params
		const storage = type === 'session' ? sessionStorage : localStorage
		const result: StorageItem[] = []

		for (let i = 0; i < storage.length; i++) {
			const key = storage.key(i)
			if (key) {
				result.push({
					name: key,
					content: this.get({ name: key, type }) || ''
				})
			}
		}

		return result
	}

	/**
	 * 清空存储
	 * @param params 清空参数
	 */
	public clear(params: IStorage = { type: 'local' }): void {
		const { type = 'local' } = params

		if (type === 'session') {
			sessionStorage.clear()
		} else {
			// 保留语言设置
			const language = this.get({ commonKey: 'language' }) || '中文'
			const accountInfo = this.get({ name: ACCOUNT_INFO })
			localStorage.clear()
			if (language) {
				this.set({ commonKey: 'language', content: language })
				this.set({ name: ACCOUNT_INFO, content: accountInfo })
			}
		}
	}

	/**
	 * 添加存储监听
	 * @param key 监听的键名
	 * @param callback 回调函数
	 */
	public addListener(keys: IKey, callback: (detail: StorageEventDetail) => void): void {
		const { name, key, commonKey } = keys
		const storageKey = this.generateKey(name, key, commonKey)
		this.listeners.set(storageKey, callback)
	}

	/**
	 * 移除存储监听
	 * @param key 监听的键名
	 */
	public removeListener(keys: IKey): void {
		const { name, key, commonKey } = keys
		const storageKey = this.generateKey(name, key, commonKey)
		this.listeners.delete(storageKey)
	}

	private generateKey(name?: string, key?: string, commonKey?: string): string {
		return key || (commonKey ? `${commonKeyName}${commonKey}` : `${keyName}${name}`)
	}

	private dispatchStorageEvent(key: string, newValue: string, type: 'local' | 'session'): void {
		try {
			const event = new StorageEvent('storage', {
				key,
				newValue,
				oldValue: null,
				storageArea: type === 'session' ? sessionStorage : localStorage
			})
			window.dispatchEvent(event)
		} catch (error) {
			console.error('Error dispatching storage event:', error)
		}
	}

	private initStorageListener(): void {
		window.addEventListener('storage', (event: StorageEvent) => {
			if (event.key && this.listeners.has(event.key)) {
				const callback = this.listeners.get(event.key)
				if (callback) {
					callback({
						key: event.key,
						newValue: event.newValue,
						oldValue: event.oldValue,
						storageArea: event.storageArea
					})
				}
			}
		})
	}
}

// 导出单例实例
export const storage = Storage.getInstance()
