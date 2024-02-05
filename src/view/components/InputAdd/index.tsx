import { useState, useCallback } from 'react';

import styles from './index.module.scss';

import add from './add.svg';

interface InputAddProps {
  onAdd: (title: string) => void;
}

export const InputAdd: React.FC<InputAddProps> = ({ onAdd }) => {
  const [inputValue, setInputValue] = useState('');
  const addTask = useCallback(() => {
    onAdd(inputValue);
    setInputValue('');
  }, [inputValue]);
  return (
    <div className={styles.inputAdd}>
      <input
        type="text"
        className={styles.inputAddField}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            addTask();
          }
        }}
        placeholder="Type here"
      />
      <button onClick={addTask} aria-label="Add" className={styles.inputAddButton}></button>
    </div>
  );
};
