const zeroOrOne = () => +(Math.random() > .5) as 1 | 0;

const randomRow = (length: number) =>
    Array.from({ length }, zeroOrOne)

export const generateMatrix = (rows: number, columns: number) => {
    return Array.from({ length: rows }, () => randomRow(columns));
};