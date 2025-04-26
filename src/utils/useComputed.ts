import { computed, type ComputedRef } from 'vue'

export function useComputed<T>(fn: (...args: any[]) => T) {
	const cache = new Map<string, ComputedRef<T>>()
	return function (...args: any[]) {
		const key = JSON.stringify(args)
		const val = cache.get(key)
		if (val) {
			return val
		} else {
			const res = computed(() => fn(...args))
			cache.set(key, res)
			return res
		}
	}
}
