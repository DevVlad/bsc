// factory to build unique actions
export default function buildConstants(actions, prefix = '') {
	const builtActions = {};

	Object.keys(actions).forEach(prop => {
		if (typeof actions[prop] !== 'object') {
			const action = prop
				.split('')
				.map(char => /[A-Z]/.test(char) ? `_${char}` : char)
				.join('')
				.toUpperCase();
			builtActions[prop] = `${prefix}${action}`
		} else {
			builtActions[prop] = buildConstants(actions[prop], `${prefix}${prop.toUpperCase()}_`);
		}
	});
	return Object.freeze(builtActions);
}