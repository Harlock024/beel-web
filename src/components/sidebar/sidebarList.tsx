import { useState } from "react";
import { ListForm } from "../list/listForm";
import { ListList } from "../list/listList";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

export function SidebarList({ className }: { className?: string }) {
  const [toggleForm, setToggleForm] = useState(false);

  return (
    <div className={cn(className, "mb-4")}>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-semibold text-gray-800">Lists</h2>
        <button
          className="text-xs px-2 py-1 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded transition-colors"
          onClick={() => setToggleForm(!toggleForm)}
        >
          {toggleForm ? "Close" : "Add List"}
        </button>
      </div>

      <div className="mb-2">
        <ListList />
      </div>

      {toggleForm && (
        <div className="mt-2 p-2 bg-white rounded border border-gray-200">
          <ListForm />
        </div>
      )}
    </div>
  );
}
