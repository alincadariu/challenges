import { Tetris } from './src/Tetris';

// TODO: Extract this logic to TetrisEngine
const canvas = document.createElement('canvas');
document.body.appendChild(canvas);

const tetris = new Tetris(canvas);

tetris.start();
