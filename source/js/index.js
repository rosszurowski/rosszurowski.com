// GO TIME

'use strict'

import domready from 'domready'
import ferrofluid from './sketches/ferrofluid'

domready(function () {

	const main = document.querySelector('[data-canvas]')
	const sketch = ferrofluid(main)

})