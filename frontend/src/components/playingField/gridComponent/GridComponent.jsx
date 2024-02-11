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
        }))
      ));

      const stack = [];
      let currentCell = { row: 0, col: 0 };
      stack.push(currentCell);

      while (stack.length > 0) {
        const neighbors = getUnvisitedNeighbors(currentCell, newGrid);

        if (neighbors.length > 0) {
          const randomNeighbor = neighbors[Math.floor(Math.random() * neighbors.length)];
          removeWall(currentCell, randomNeighbor, newGrid);
          randomNeighbor.visited = true;
          stack.push(randomNeighbor);
          currentCell = randomNeighbor;
        } else {
          currentCell = stack.pop();
        }
      }

      setGrid(newGrid);
    };

    const getUnvisitedNeighbors = (cell, grid) => {
      const neighbors = [];

      const directions = [
        { row: -2, col: 0 },
        { row: 2, col: 0 },
        { row: 0, col: -2 },
        { row: 0, col: 2 },
      ];

      directions.forEach(direction => {
        const newRow = cell.row + direction.row;
        const newCol = cell.col + direction.col;

        if (newRow >= 0 && newRow < gridSize && newCol >= 0 && newCol < gridSize) {
          if (!grid[newRow][newCol].visited) {
            neighbors.push(grid[newRow][newCol]);
          }
        }
      });

      return neighbors;
    };

    const removeWall = (currentCell, nextCell, grid) => {
      const rowDiff = nextCell.row - currentCell.row;
      const colDiff = nextCell.col - currentCell.col;

      const wallToRemove = {
        row: currentCell.row + rowDiff / 2,
        col: currentCell.col + colDiff / 2,
      };

      grid[wallToRemove.row][wallToRemove.col].visited = true;
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
              className={`${styles.grid_item} ${cell.visited ? styles.visited : ''}`}
            >
              {/* Блок окрашивается в белый цвет, если посещен */}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default GridComponent;
