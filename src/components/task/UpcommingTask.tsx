import { Task } from "@/types/task";
import useTask from "../task/store/TaskStore";
import { useMemo } from "react";
import { isToday, isTomorrow, isThisWeek } from "date-fns";
import { TaskCard } from "./TaskCard";

export function UpcomingTask() {
  const { tasks } = useTask();

  const filteredTasks = useMemo(() => {
    if (!tasks) return { today: [], tomorrow: [], thisWeek: [] };

    const todayTasks = tasks.filter((task) =>
      task.dueDate ? isToday(task.dueDate) : false,
    );

    const tomorrowTasks = tasks.filter((task) =>
      task.dueDate ? isTomorrow(task.dueDate) : false,
    );

    const thisWeekTasks = tasks.filter(
      (task) =>
        task.dueDate &&
        isThisWeek(task.dueDate, { weekStartsOn: 1 }) && // La semana comienza el lunes
        !isToday(task.dueDate) &&
        !isTomorrow(task.dueDate),
    );

    return {
      today: todayTasks,
      tomorrow: tomorrowTasks,
      thisWeek: thisWeekTasks,
    };
  }, [tasks]);

  return (
    <div>
      <h1>Upcoming Tasks</h1>

      <section>
        <h2>Today</h2>
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

      <section>
        <h2>Tomorrow</h2>
        {filteredTasks.tomorrow.length > 0 ? (
          <ul>
            {filteredTasks.tomorrow.map((task) => (
              <li key={task.id} className="task-item">
                <TaskCard task={task} />
              </li>
            ))}
          </ul>
        ) : (
          <p>No tasks for tomorrow</p>
        )}
      </section>

      <section>
        <h2>This Week</h2>
        {filteredTasks.thisWeek.length > 0 ? (
          <ul>
            {filteredTasks.thisWeek.map((task) => (
              <li key={task.id} className="task-item">
                <TaskCard task={task} />
              </li>
            ))}
          </ul>
        ) : (
          <p>No tasks for this week</p>
        )}
      </section>
    </div>
  );
}
