import { Plus } from "lucide-react";
import useTags from "./store/tagsStore";
import { FormEvent, useRef } from "react";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover } from "@radix-ui/react-popover";
import { PopoverContent, PopoverTrigger } from "../ui/popover";

export function TagsForm() {
  const { addTag } = useTags();
  const nameTag = useRef<HTMLInputElement>(null);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (nameTag.current?.value) {
      addTag(nameTag.current.value);
    }
    nameTag.current!.value = "";
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="flex bg-gray-200 p-1 rounded-md items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Tag
        </button>
      </PopoverTrigger>
      <PopoverContent>
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <input
            type="text"
            placeholder="New tag"
            ref={nameTag}
            className="border-none placeholder:font-normal font-normal ring-0 focus:ring-0 focus:outline-none flex-1 ml-2 bg-transparent"
          />
          <button type="submit" className="hidden"></button>
        </form>
      </PopoverContent>
    </Popover>
  );
}
