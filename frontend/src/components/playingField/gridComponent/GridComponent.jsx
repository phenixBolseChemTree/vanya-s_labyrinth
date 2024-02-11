import styles from './gridComponent.module.css';

const GridComponent = ({ gridSize }) => {
  const generateGrid = () => {
    const gridItems = Array.from({ length: gridSize }, (_, rowIndex) => (
      <div key={rowIndex} className={styles.grid_row}>
        {Array.from({ length: gridSize }, (_, colIndex) => (
          <div key={rowIndex * gridSize + colIndex} className={styles.grid_item}>
            {rowIndex * gridSize + colIndex + 1}
          </div>
        ))}
      </div>
    ));
    return gridItems;
  };

  return (
    <div className={styles.grid_container}>
      {generateGrid()}
    </div>
  );
};

export default GridComponent;
