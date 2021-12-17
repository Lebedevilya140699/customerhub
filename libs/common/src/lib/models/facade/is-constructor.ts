export function isConstructor(func: Function): boolean {
	return (
		(func && typeof func === 'function' && func.prototype && func.prototype.constructor) ===
		func
	);
}
