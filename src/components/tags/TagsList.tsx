import React from "react";
import useTags from "./store/tagsStore";
import { TagsForm } from "./tagsForm";
import { getContrastTextColor } from "@/lib/contrast";

export function TagsList() {
  const { tags } = useTags();

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => {
          const textColor = getContrastTextColor(tag.color);
          return (
            <div
              style={{ backgroundColor: tag.color, color: textColor }}
              className="flex items-center justify-center px-3 py-1 text-sm font-medium rounded-md  transition-colors "
            >
              {tag.name}
            </div>
          );
        })}
      </div>
      <TagsForm />
    </div>
  );
}
