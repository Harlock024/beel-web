import { Task } from "@/types/task";
import { useTaskStore } from "../task/store/TaskStore";
import { useMemo, useState } from "react";
import { isToday, isTomorrow, isThisWeek } from "date-fns";
import { TaskCard } from "./TaskCard";

export function UpcomingTask() {
  const { tasks } = useTaskStore();

  const filteredTasks = useMemo(() => {
    if (!tasks) return { today: [], tomorrow: [], thisWeek: [] };

    const todayTasks = tasks.filter((task) =>
      task.dueDate ? isToday(task.dueDate) : false,
    );

    const tomorrowTasks = tasks.filter((task) =>
      task.dueDate ? isTomorrow(task.dueDate) : false,
    );
    const countUpcomingTasks = tasks.reduce(
      (acc, task) => {
        if (task.dueDate) {
          if (isToday(task.dueDate)) {
            acc.today += 1;
          } else if (isTomorrow(task.dueDate)) {
            acc.tomorrow += 1;
          } else if (isThisWeek(task.dueDate, { weekStartsOn: 1 })) {
            acc.thisWeek += 1;
          }
        }
        return acc;
      },
      { today: 0, tomorrow: 0, thisWeek: 0 },
    );

    const thisWeekTasks = tasks.filter(
      (task) =>
        task.dueDate &&
        isThisWeek(task.dueDate, { weekStartsOn: 1 }) &&
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
      <h1 className=" flex  gap-2 text-3xl font-bold ">
        Upcoming Tasks
        <span>
          {filteredTasks.thisWeek.length +
            filteredTasks.today.length +
            filteredTasks.tomorrow.length}
        </span>
      </h1>
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
