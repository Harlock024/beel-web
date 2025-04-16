import { ScrollArea } from "../ui/scroll-area";
import { ListCard } from "./listCard";
import useListStore from "../../stores/listStore";
import { useEffect } from "react";
import { useFilterStore } from "@/stores/FilterStore";

export function ListList() {
  const { lists, list, getList } = useListStore();
  const { resetFilter, filterByListId } = useFilterStore();

  useEffect(() => {
    if (list) {
      filterByListId(list.id);
    } else {
      resetFilter();
    }
  }, [list, filterByListId, resetFilter]);

  const handleListClick = (id: string) => {
    if (list?.id === id) {
      return;
    }
    getList(id);
  };
  return (
    <div className="flex flex-col box-border font-semibold">
      <ScrollArea className="w-full">
        {lists.map((listItem) => (
          <ListCard
            key={listItem.id}
            list={listItem}
            isSelected={list?.id === listItem.id}
            onClick={() => handleListClick(listItem.id)}
          />
        ))}
      </ScrollArea>
    </div>
  );
}
