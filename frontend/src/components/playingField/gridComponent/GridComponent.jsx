import React, { useEffect, useState } from 'react';
import styles from './gridComponent.module.css';

const GridComponent = ({ gridSize }) => {
  const [grid, setGrid] = useState([]);

  useEffect(() => {
    const generateMaze = () => {
      const newGrid = Array.from({ length: gridSize }, (_, rowIndex) => (
        Array.from({ length: gridSize }, (_, colIndex) => ({
          row: rowIndex,
          col: colIndex,
          visited: false,
          wall: true,
        }))
      ));

      const startRow = Math.floor(Math.random() * gridSize);
      const startCol = Math.floor(Math.random() * gridSize);

      newGrid[startRow][startCol].visited = true;
      newGrid[startRow][startCol].wall = false;

      const walls = getWalls(startRow, startCol, gridSize);

      while (walls.length > 0) {
        const randomWallIndex = Math.floor(Math.random() * walls.length);
        const { row, col } = walls[randomWallIndex];

        const neighbors = getNeighbors(row, col, newGrid);

        const unvisitedNeighbors = neighbors.filter(
          neighbor => !newGrid[neighbor.row][neighbor.col].visited
        );

        if (unvisitedNeighbors.length > 0) {
          const randomNeighbor = unvisitedNeighbors[Math.floor(Math.random() * unvisitedNeighbors.length)];
          newGrid[randomNeighbor.row][randomNeighbor.col].visited = true;
          newGrid[randomNeighbor.row][randomNeighbor.col].wall = false;

          newGrid[row][col].visited = true;
          newGrid[row][col].wall = false;

          const newWalls = getWalls(randomNeighbor.row, randomNeighbor.col, gridSize);
          walls.push(...newWalls);
        }

        walls.splice(randomWallIndex, 1);
      }

      setGrid(newGrid);
    };

    const getNeighbors = (row, col, grid) => {
      const directions = [
        { row: -2, col: 0 },
        { row: 2, col: 0 },
        { row: 0, col: -2 },
        { row: 0, col: 2 },
      ];

      const neighbors = [];

      directions.forEach(direction => {
        const newRow = row + direction.row;
        const newCol = col + direction.col;

        if (newRow >= 0 && newRow < gridSize && newCol >= 0 && newCol < gridSize) {
          neighbors.push({ row: newRow, col: newCol });
        }
      });

      return neighbors;
    };

    const getWalls = (row, col, gridSize) => {
      const walls = [];

      const directions = [
        { row: -2, col: 0 },
        { row: 2, col: 0 },
        { row: 0, col: -2 },
        { row: 0, col: 2 },
      ];

      directions.forEach(direction => {
        const newRow = row + direction.row;
        const newCol = col + direction.col;

        if (newRow >= 0 && newRow < gridSize && newCol >= 0 && newCol < gridSize) {
          walls.push({ row: newRow, col: newCol });
        }
      });

      return walls;
    };

    generateMaze();
  }, [gridSize]);

  return (
    <div className={styles.grid_container}>
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} className={styles.grid_row}>
          {row.map((cell, colIndex) => (
            <div
              key={rowIndex * gridSize + colIndex}
              className={`${styles.grid_item} ${cell.wall ? styles.wall : ''}`}
            >
              {/* Блоки с классом 'wall' будут иметь стиль, задающий стену */}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default GridComponent;
