export function generateMatrice(rows: number, columns:number) {
    return Array.from({length: rows}, () => Array.from({length: columns}, () => Math.round(Math.random())));
}