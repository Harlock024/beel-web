import { List } from "@/types/list";
import { Label } from "../ui/label";

interface ListCardProps {
  list: List;
}

export function ListCard({ list }: ListCardProps) {
  return (
    <div
      className="flex items-center w-full justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
      role="button"
      aria-label={`List ${list.name} with ${list.numTaskAsigned} tasks`}
      tabIndex={0}
    >
      <div className="flex items-center gap-2 flex-1">
        <div
          className="size-5 rounded-md"
          style={{ backgroundColor: list.color || "#FF475A" }}
          aria-hidden="true"
        ></div>
        <Label className="font-semibold truncate">{list.name}</Label>
      </div>
      <div
        className="flex bg-gray-200 size-6 rounded-sm justify-center items-center text-sm font-medium"
        aria-label={`Number of tasks: ${list.numTaskAsigned}`}
      >
        {list.numTaskAsigned}
      </div>
    </div>
  );
}
