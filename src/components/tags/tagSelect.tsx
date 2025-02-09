import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import useTagStore from "./store/tagsStore";
import { Tag } from "@/types/tags";

import { getContrastTextColor } from "@/lib/contrast";
import { Task } from "@/types/task";

export function TagSelect({
  taskSelected,
}: {
  taskSelected: Task | undefined;
}) {
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const { tags, assignTagToTask, unassignTagFromTask } = useTagStore();

  const handleTagSelect = (tag: Tag) => {
    if (!taskSelected!.tags!.includes(tag)) {
      setSelectedTags([...selectedTags, tag]);
      assignTagToTask(tag, taskSelected!);
    }
  };
  const removeTag = (tag: Tag) => {
    setSelectedTags(selectedTags.filter((t) => t !== tag));
    unassignTagFromTask(tag, taskSelected!);
  };

  return (
    <div>
      <div className="grid grid-cols-3 gap-2">
        {selectedTags.map((tag) => {
          const textColor = getContrastTextColor(tag.color);
          return (
            <Button
              key={tag.name}
              style={{ backgroundColor: tag.color, color: textColor }}
              onClick={() => removeTag(tag)}
              className={`flex items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer`}
            >
              <span
                className="flex items-center justify-center px-3 py-1 text-sm font-medium rounded-md  transition-colors"
                style={{ backgroundColor: tag.color, color: textColor }}
              >
                {tag.name}
              </span>
            </Button>
          );
        })}

        <Popover>
          <PopoverTrigger asChild>
            <Button className="flex hover:text-white  bg-gray-200 p-1 text-black rounded-md items-center gap-2">
              <Plus className="w-4 h-4" />
              Add Tag
            </Button>
          </PopoverTrigger>

          <PopoverContent>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => {
                const textColor = getContrastTextColor(tag.color);
                return (
                  <Button
                    key={tag.name}
                    style={{ backgroundColor: tag.color, color: textColor }}
                    onClick={() => handleTagSelect(tag)}
                    disabled={taskSelected?.tags!.includes(tag)}
                    className={`flex items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer`}
                  >
                    <span className="flex items-center justify-center px-3 py-1 w-f text-sm font-medium rounded-md  transition-colors">
                      {tag.name}
                    </span>
                  </Button>
                );
              })}
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
