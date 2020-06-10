export const matrixForEach = (
    matrix: number[][],
    callbackFn: (value: number, y: number, x: number) => void,
) => {
    matrix.forEach((line, y) => {
        line.forEach((column, x) => {
            callbackFn(column, y, x);
        });
    });
};