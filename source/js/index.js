// GO TIME

'use strict'

import domready from 'domready'
import fields from './sketches/fields'

domready(function () {

	const main = document.querySelector('[data-canvas]')
	const sketch = fields(main)

})