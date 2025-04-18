import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer'
import loginMock from './login'

export function setupMockServer() {
	if (import.meta.env.PROD) {
		createProdMockServer([...loginMock])
	}
}

export default [...loginMock]
