import { Input } from "../ui/input";
import { FormEvent, useRef, useState } from "react";
import { Plus } from "lucide-react";
import useListStore from "./store/listStore";
import { List } from "@/types/list";

export function ListForm() {
  const nameRef = useRef<HTMLInputElement>(null);
  const { lists, createList } = useListStore();

  function handleCreateList(e: FormEvent) {
    e.preventDefault();
    if (nameRef.current?.value) {
      const newList: List = {
        id: lists.length + 1,
        name: nameRef.current.value,
        numTaskAsigned: 0,
        color: "",
      };
      createList(newList);
    }
    nameRef!.current!.value = "";
  }
  return (
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
        />
      </div>
      <button className="hidden" type="submit"></button>
    </form>
  );
}
