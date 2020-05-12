import { randomInt } from "./randomInt";

export function randomColor() {
	const r = randomInt(255);
	const g = randomInt(255);
	const b = randomInt(255);
	return `rgb(${r}, ${g}, ${b})`;
}
