import { useState, useRef, useEffect } from 'react';

import styles from './index.module.scss';
import edit from './images/edit.svg';

interface TaskItemProps {
  id: string;
  title: string;
  onDone: (title: string) => void;
  onEdited: (id: string, title: string) => void;
  onRemoved: (id: string) => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({ title, id, onDone, onEdited, onRemoved }) => {
  const [checked, setChecked] = useState(false);
  const [editModeActive, setEditModeActive] = useState(false);
  const [value, setValue] = useState(title);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editModeActive) {
      inputRef?.current?.focus();
    }
  }, [editModeActive]);

  return (
    <div className={styles.taskItem}>
      <label htmlFor="" className={styles.taskItemLabel}>
        <input
          type="checkbox"
          checked={checked}
          disabled={editModeActive}
          className={styles.taskItemCheckbox}
          onChange={(e) => {
            setChecked(e.target.checked);
            if (e.target.checked) {
              setTimeout(() => {
                onDone(id);
              }, 300);
            }
          }}
        />
        {editModeActive ? (
          <input
            value={value}
            className={styles.taskItemInput}
            onChange={(e) => {
              setValue(e.target.value);
            }}
            ref={inputRef}
          />
        ) : (
          <h3 className={styles.taskItemTitle}>{title}</h3>
        )}
      </label>
      {editModeActive ? (
        <button
          className={styles.taskItemSave}
          arai-label="Save"
          onClick={() => {
            onEdited(id, value);
            setEditModeActive(false);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              onEdited(id, value);
              setEditModeActive(false);
            }
          }}></button>
      ) : (
        <button
          className={styles.taskItemEdit}
          arai-label="Edit"
          onClick={() => {
            setEditModeActive(true);
          }}></button>
      )}
      <button
        className={styles.taskItemRemove}
        arai-label="Remove"
        onClick={() => {
          if (confirm('Are you sure?')) {
            onRemoved(id);
          }
        }}
      />
    </div>
  );
};
