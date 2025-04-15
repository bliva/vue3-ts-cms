/**
 * 判断是否为空
 */
export function validateNull(val: unknown): boolean {
	// 布尔值和数字直接返回 false
	if (typeof val === 'boolean' || typeof val === 'number') {
		return false
	}
	// 检查空数组
	if (Array.isArray(val)) {
		return val.length === 0
	}
	// 检查空对象（使用 Object.keys 代替 JSON.stringify）
	if (val !== null && typeof val === 'object') {
		return Object.keys(val).length === 0
	}

	// 检查 null、undefined、空字符串及其字符串形式
	return val === 'null' || val === null || val === 'undefined' || val === undefined || val === ''
}
