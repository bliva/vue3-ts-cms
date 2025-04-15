// 或修复类型缺失问题（如果遇到Random报错）
declare module 'mockjs' {
	namespace Mock {
		export interface Random {
			string(pool?: string, min?: number, max?: number): string
			string(count?: number): string
			string(pool?: string, count?: number): string
			// 其他你需要的方法...
		}
	}
}
