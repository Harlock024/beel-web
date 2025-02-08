import { Subtask } from "@/types/subTask";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Trash2 } from "lucide-react";

interface SubtaskProp {
  subtask: Subtask;
  onDelete: (subtask: Subtask) => void;
}

export function SubTaskCard({ subtask, onDelete }: SubtaskProp) {
  const [doneSubtask, setDoneSubtask] = useState(subtask.state);
  function handleDoneSubtask() {
    setDoneSubtask(!doneSubtask);
  }
  function handleDeleteSubtask() {
    onDelete(subtask);
  }

  return (
    <div className="flex gap-2 items-center  ">
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
      <button type="button" onClick={handleDeleteSubtask}>
        <span className="">
          <Trash2 className="h-5 w-5 text-gray-300 cursor-pointer" />
        </span>
      </button>
    </div>
  );
}
