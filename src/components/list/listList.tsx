import { ScrollArea } from "../ui/scroll-area";
import { ListCard } from "./listCard";
import useListStore from "./store/listStore";
import { useFilterStore } from "../task/store/FilterStore";
import { useEffect } from "react";

export function ListList() {
  const { lists, listId, getListID } = useListStore();
  const { resetFilter, filterByListId } = useFilterStore();

  useEffect(() => {
    if (listId !== null) {
      filterByListId(listId);
    } else {
      resetFilter();
    }
  }, [listId, resetFilter, filterByListId]);

  const handleListClick = (id: number) => {
    if (listId === id) {
      return; // No hacer nada si ya está seleccionada
    } else {
      getListID(id);
      filterByListId(id);
    }
  };

  return (
    <div className="flex flex-col h-auto box-border font-semibold">
      <ScrollArea className="w-full">
        {lists.map((list) => (
          <ListCard
            key={list.id}
            list={list}
            isSelected={listId === list.id}
            onClick={() => handleListClick(list.id)}
          />
        ))}
      </ScrollArea>
    </div>
  );
}
