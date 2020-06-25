export const transform2Dinto1Darray = (shape) => {
    return shape.reduce((acc, currentValue) => acc.concat(currentValue));
}