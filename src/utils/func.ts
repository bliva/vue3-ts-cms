/**
 * 不为空
 * @param val
 * @returns {boolean}
 */
export function notEmpty(val: unknown) {
	return !isEmpty(val)
}

/**
 * 为空
 * @param val
 * @returns {boolean}
 */
export function isEmpty(val: unknown): boolean {
	// 检查 null 或 undefined
	if (val === null || val === undefined) {
		return true
	}
	// 检查空字符串或特定字符串
	if (typeof val === 'string' && (val === '' || val === 'undefined' || val === 'null')) {
		return true
	}
	// 检查空数组
	if (Array.isArray(val) && val.length === 0) {
		return true
	}
	// 检查空对象
	if (Object.prototype.toString.call(val) === '[object Object]' && Object.keys(val as object).length === 0) {
		return true
	}
	return false
}
