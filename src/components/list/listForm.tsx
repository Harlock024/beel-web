import { Input } from "../ui/input";
import { FormEvent, useRef } from "react";
import { Plus } from "lucide-react";
import useListStore from "./store/listStore";

export function ListForm() {
  const nameRef = useRef<HTMLInputElement>(null);
  const { lists, createList } = useListStore();

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
    <>
      <form
        onSubmit={handleCreateList}
        className="flex justify-start  shadow-inner rounded-md items-center "
      >
        <div className="flex items-center">
          <Plus className="text-gray-400 h-5 w-5" />
          <input
            className="border-none placeholder:font-normal ring-0 focus:ring-0 focus:outline-none"
            type="text"
            placeholder="Add New List"
            ref={nameRef}
          />
        </div>
        <button className="hidden" type="submit">
          create task
        </button>
      </form>
    </>
  );
}
