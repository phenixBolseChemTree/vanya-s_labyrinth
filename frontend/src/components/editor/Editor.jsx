import React, { useEffect, useState } from 'react';
import styles from './editor.module.css';

const Editor = ({ gridSize }) => {
  const [grid, setGrid] = useState(Array.from({ length: gridSize }, () => Array(gridSize).fill('field')));
  
  useEffect(() => {
    // Функция для обновления grid при изменении gridSize
    const updateGrid = () => {
      setGrid(Array.from({ length: gridSize }, () => Array(gridSize).fill('field')));
    };

    // Вызывается при монтировании компонента и при каждом изменении gridSize
    updateGrid();

    // Возвращаем функцию, которая будет вызвана при размонтировании компонента
    return () => {
      // Здесь можно добавить необходимые действия при размонтировании, если такие есть
    };
  }, [gridSize]);

  return (
    <div className={styles.root}>
      <div
        className={styles.grid_container}
      >
        {grid.map((rowArray, rowIndex) => (
          <div key={rowIndex} className={styles.grid_row}>
            {rowArray.map((cell, colIndex) => (
              <div
                key={colIndex}
                style={{ height: `${100 / gridSize}vh`, width: `${100 / gridSize}vh` }}                
                className={`${styles.grid_item} ${cell === 'block' ? styles.block : ''}`}
              ></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Editor;
