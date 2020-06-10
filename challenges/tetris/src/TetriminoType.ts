export enum TetriminoType {
    Hero = 1,
    BlueRicky,
    OrangeRicky,
    Smashboy,
    RhodeIslandZ,
    Teewee,
    ClevelandZ,
}

export const TETRIMINO_TYPE_COUNT = Object.keys(TetriminoType).length / 2;

export const TETRIMINO_MATRIX_MAP: Record<TetriminoType, number[][]> = {
    [TetriminoType.Hero]: [
        [1],
        [1],
        [1],
        [1],
    ],
    [TetriminoType.BlueRicky]: [
        [1, 0, 0],
        [1, 1, 1],
    ],
    [TetriminoType.OrangeRicky]: [
        [0, 0, 1],
        [1, 1, 1],
    ],
    [TetriminoType.Smashboy]: [
        [1, 1],
        [1, 1],
    ],
    [TetriminoType.RhodeIslandZ]: [
        [0, 1, 1],
        [1, 1, 0],
    ],
    [TetriminoType.Teewee]: [
        [0, 1, 0],
        [1, 1, 1],
    ],
    [TetriminoType.ClevelandZ]: [
        [1, 1, 0],
        [0, 1, 1],
    ],
};

export const TETRIMIN_COLOR_MAP: Record<TetriminoType, string> = {
    [TetriminoType.Hero]: '#38C6F4',
    [TetriminoType.BlueRicky]: '#0067DF',
    [TetriminoType.OrangeRicky]: '#FA4616',
    [TetriminoType.Smashboy]: '#FFB40E',
    [TetriminoType.RhodeIslandZ]: '#34DE69',
    [TetriminoType.Teewee]: '#933692',
    [TetriminoType.ClevelandZ]: '#ED145B',
}
