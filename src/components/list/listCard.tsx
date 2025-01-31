import { List } from "@/types/list";
import { Label } from "../ui/label";
import useTask from "@/components/task/store/TaskStore";
import { FormEvent } from "react";
import useList from "./store/listStore";

interface ListCardProps {
  list: List;
  isSelected: boolean;
  onClick: () => void;
}

export function ListCard({ list, isSelected, onClick }: ListCardProps) {
  return (
    <button
      className="flex items-center w-full justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
      onClick={onClick}
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
    </button>
  );
}
