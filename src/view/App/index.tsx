import { useToDoStore } from '../../data/stores/useToDoStore';
import { InputAdd } from '../components/InputAdd';
import { TaskItem } from '../components/TaskItem';

import styles from './index.module.scss';

export const App: React.FC = () => {
  const [tasks, createTask, updateTask, removeTask] = useToDoStore((state) => [
    state.tasks,
    state.createTask,
    state.updateTask,
    state.removeTask,
  ]);

  return (
    <article className={styles.article}>
      <h1 className={styles.articleTitle}>To Do App</h1>
      <section className={styles.articleSection}>
        <InputAdd
          onAdd={(title) => {
            if (title) {
              createTask(title);
            }
          }}
        />
      </section>
      <section className={styles.articleSection}>
        <ul className={styles.articleTaskList}>
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <TaskItem
                key={task.id}
                title={task.title}
                id={task.id}
                onDone={removeTask}
                onEdited={updateTask}
                onRemoved={removeTask}
              />
            ))
          ) : (
            <p className={styles.articleMessage}>You have not added tasks yet</p>
          )}
        </ul>
      </section>
    </article>
  );
};
