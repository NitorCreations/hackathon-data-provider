import { sampleSize } from 'lodash';

const randomIntBetween = (minInclusive: number, maxNotInclusive: number) => {
    return Math.floor(Math.random() * (maxNotInclusive - minInclusive) + minInclusive);
};

export function randomElement<T>(elements: Array<T>): T {
    return elements[randomIntBetween(0, elements.length)];
}

export function oneOrMoreElements<T>(elements: Array<T>): T[] {
    return sampleSize(elements, randomIntBetween(1, elements.length));
}