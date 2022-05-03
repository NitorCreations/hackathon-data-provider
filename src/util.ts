import Rand from 'rand-seed'

export const rand = new Rand((process.env.SEED as string|undefined) || 'gr8');

const randomIntBetween = (minInclusive: number, maxNotInclusive: number) => {
    return Math.floor(rand.next() * (maxNotInclusive - minInclusive) + minInclusive);
};

export function randomElement<T>(elements: Array<T>): T {
    return elements[randomIntBetween(0, elements.length)];
}