import { resolve } from "path";

export function generateModifyVars() {
	const root = process.cwd()

	return {
		// reference:  Avoid repeated references
		// hack: `true; @import (reference) "${resolve('src/design/config.less')}";`,

		hack: `true; @import (reference) "${resolve(
			root,
			'src/design/index.less'
		)}";`,
	}
}
