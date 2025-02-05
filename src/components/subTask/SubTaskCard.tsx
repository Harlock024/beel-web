import { Subtask } from "@/types/subTask";
import { useState } from "react";
import { Label } from "@/components/ui/label";

export function SubTaskCard({ subtask }: { subtask: Subtask }) {
  const [doneSubtask, setDoneSubtask] = useState(false);
  function handleDoneSubtask() {
    setDoneSubtask(!doneSubtask);
  }
  return (
    <div className="flex gap-2 ">
      <input onChange={handleDoneSubtask} type="checkbox" />
      <Label
        className={
          doneSubtask
            ? `line-through text-gray-300 text-lg `
            : `font-semibold text-lg `
        }
      >
        {subtask.name}
      </Label>
    </div>
  );
}
