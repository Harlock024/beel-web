import { useMemo } from "react";
import { useTaskStore } from "./store/TaskStore";
import { isToday, isTomorrow, isThisWeek } from "date-fns";
import { TaskCard } from "./TaskCard";

export function TodayTask({ className }: { className: string }) {
  const { tasks } = useTaskStore();

  const filteredTasks = useMemo(() => {
    if (!tasks) return { today: [], tomorrow: [], thisWeek: [] };

    const todayTasks = tasks.filter((task) =>
      task.dueDate ? isToday(task.dueDate) : false,
    );
    return {
      today: todayTasks,
    };
  }, [tasks]);

  return (
    <div className={className}>
      <section>
        <h2>Today{filteredTasks.today.length}</h2>
        {filteredTasks.today.length > 0 ? (
          <ul>
            {filteredTasks.today.map((task) => (
              <TaskCard task={task} />
            ))}
          </ul>
        ) : (
          <p>No tasks for today</p>
        )}
      </section>
    </div>
  );
}
