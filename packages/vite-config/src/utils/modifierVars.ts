import { resolve } from 'path'
import { generate } from '@ant-design/colors'
const primaryColor = '#0960bd'

function generateAntColors(
	color: string,
	theme: 'default' | 'dark' = 'default'
) {
	return generate(color, {
		theme,
	})
}

export function generateModifyVars() {
	const root = process.cwd()
	const palettes = generateAntColors(primaryColor)
	const primary = palettes[5]

	return {
		// reference:  Avoid repeated references
		// hack: `true; @import (reference) "${resolve('src/design/config.less')}";`,
		'primary-color': primary,
		hack: `true; @import (reference) "${resolve(
			root,
			'src/design/index.less'
		)}";`,
		'error-color': '#ED6F6F',
		'warning-color': '#EFBD47',
		'success-color': '#55D187',
	}
}
