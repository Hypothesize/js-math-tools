function isDataFrame(x) {
	try {
		return (
			!!x._symbol && x._symbol === Symbol.for("@sparkwave/js-math-tools/dataframe")
		)
	} catch (e) {
		return false
	}
}

module.exports = isDataFrame
