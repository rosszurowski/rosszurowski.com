var i, n, d, v;

module.exports = function (pixels) {
	d = pixels.data;
	for (i = 3, n = d.length; i < n; i += 4) {
		v = d[i];
		// d[i] is alpha
		if (v > 40 && v < 55) d[i] = 200;
		else if (v > 150 && v < 165) d[i] = 200;
		else if (v > 200 && v < 215) d[i] = 200;
		else if (v > 220 && v < 235) d[i] = 200;
		else d[i] = 0;
	}
	return pixels;
}