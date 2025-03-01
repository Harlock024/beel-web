import { Plus } from "lucide-react";
import useTags from "./store/tagsStore";
import { FormEvent, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Popover } from "@radix-ui/react-popover";
import { PopoverContent, PopoverTrigger } from "../ui/popover";
import { Tag } from "@/types/tags";
import { BlockPicker } from "react-color";

export function TagsForm() {
  const { addTag } = useTags();
  const nameTag = useRef<HTMLInputElement>(null);
  const [color, setColor] = useState("#7fdde9");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (nameTag.current?.value && color) {
      const newTag: Tag = {
        name: nameTag.current.value,
        color: color,
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
          <Popover>
            <PopoverTrigger asChild>
              <button
                type="button"
                className="rounded-md p-1 size-6"
                style={{ backgroundColor: color }}
              ></button>
            </PopoverTrigger>
            <PopoverContent className="flex w-auto justify-center p-0 mt-2 ">
              <BlockPicker color={color} onChange={(e) => setColor(e.hex)} />
            </PopoverContent>
          </Popover>
          <button type="submit" className="hidden"></button>
        </form>
      </PopoverContent>
    </Popover>
  );
}
