import { Input } from "../ui/input";
import { FormEvent, useRef, useState } from "react";
import { Plus } from "lucide-react";
import useListStore from "./store/listStore";

export function ListForm() {
  const nameRef = useRef<HTMLInputElement>(null);
  const { lists, createList } = useListStore();
  const [error, setError] = useState<string | null>(null);

  function handleCreateList(e: FormEvent) {
    e.preventDefault();

    if (nameRef.current?.value) {
      const newList = {
        id: lists.length + 1,
        name: nameRef.current.value,
        numTaskAsigned: 0,
      };
      createList(newList);
    }

    nameRef!.current!.value = "";
  }
  return (
    <div className="w-full">
      <form
        onSubmit={handleCreateList}
        className="flex justify-start  border-none rounded-md items-center p-2 bg-gray-50"
      >
        <div className="flex items-center flex-1">
          <Plus className="text-gray-400 border-none h-5 w-5" />
          <input
            className="border-none placeholder:font-normal font-normal ring-0 focus:ring-0 focus:outline-none flex-1 ml-2 bg-transparent"
            type="text"
            placeholder="Add New List"
            ref={nameRef}
            aria-label="Add New List"
          />
        </div>
        <button className="hidden" type="submit"></button>
      </form>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
