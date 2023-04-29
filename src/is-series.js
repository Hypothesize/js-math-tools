function isSeries(x) {
	try {
		return (
			!!x._symbol && x._symbol === Symbol.for("@sparkwave/js-math-tools/series")
		)
	} catch (e) {
		return false
	}
}

module.exports = isSeries
