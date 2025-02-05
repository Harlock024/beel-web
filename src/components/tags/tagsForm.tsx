import { Plus } from "lucide-react";
import useTags from "./store/tagsStore";
import { FormEvent, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Popover } from "@radix-ui/react-popover";
import { PopoverContent, PopoverTrigger } from "../ui/popover";
import { Tag } from "@/types/tags";

export function TagsForm() {
  const { addTag } = useTags();
  const nameTag = useRef<HTMLInputElement>(null);
  const colorTag = useRef<HTMLInputElement>(null);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (nameTag.current?.value) {
      const newTag: Tag = {
        name: nameTag.current.value,
        color: colorTag.current?.value || "#fff",
      };
      addTag(newTag);
    }
    nameTag.current!.value = "";
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="flex hover:text-white  bg-gray-200 p-1 text-black rounded-md items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Tag
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <input
            type="text"
            placeholder="New tag"
            ref={nameTag}
            className="border-none placeholder:font-normal font-normal ring-0 focus:ring-0 focus:outline-none flex-1 ml-2 bg-transparent"
          />
          <input
            type="color"
            placeholder="new color"
            ref={colorTag}
            className="border-none"
          />
          <button type="submit" className="hidden"></button>
        </form>
      </PopoverContent>
    </Popover>
  );
}
