import React from "react";
import useTags from "./store/tagsStore";
import { TagsForm } from "./tagsForm";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

export function TagsList() {
  const { tags } = useTags();

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <div
            key={tag}
            className="flex items-center justify-center px-3 py-1 text-sm font-medium rounded-md bg-cyan-100 text-cyan-800 hover:bg-cyan-200 transition-colors"
          >
            {tag}
          </div>
        ))}
      </div>
      <TagsForm />
    </div>
  );
}
