import GridComponent from './gridComponent';
import styles from './playingFueld.module.css';

const data = 10;

const PlayingFuield = () => {
console.log('PlayingFuield');

return (
  <div className={styles.root}>
    <GridComponent gridSize={data}/>
  </div>
);
}

export default PlayingFuield;