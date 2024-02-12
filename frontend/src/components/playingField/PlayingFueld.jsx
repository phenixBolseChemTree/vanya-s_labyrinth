import React, { useEffect, useState } from 'react';
import Editor from '../editor/Editor';
import styles from './playingFueld.module.css';

const PlayingFuield = () => {
  const [data, setData] = useState(6);
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    const value = e.target.value;

    // Проверяем, является ли введенное значение числом
    if (!isNaN(value)) {
      // Если число больше 65, устанавливаем его в 65
      setData(Math.min(Number(value), 65));
      setInputValue(Math.min(Number(value), 65).toString());
    }
  };

  return (
    <div className={styles.root}>
        <label htmlFor="inputField">Введите число: </label>
        <input
          id="inputField"
          type="text"
          value={inputValue}
          placeholder='Создай свое поле'
          onChange={handleInputChange}
        />
      
      <Editor gridSize={data} />
    </div>
  );
}

export default PlayingFuield;
