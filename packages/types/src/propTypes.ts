import { createTypes, VueTypesInterface } from 'vue-types'

type PropTypes = VueTypesInterface & {}

const newPropTypes = createTypes({
	func: undefined,
	bool: undefined,
	string: undefined,
	number: undefined,
	object: undefined,
	integer: undefined,
}) as PropTypes

class propTypes extends newPropTypes {}

export { propTypes }
