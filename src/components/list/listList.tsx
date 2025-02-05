import { ScrollArea } from "../ui/scroll-area";
import { ListCard } from "./listCard";
import useListStore from "./store/listStore";
import { useFilterStore } from "../task/store/FilterStore";
import { useEffect } from "react";

export function ListList() {
  const { lists, selectedListId, deselectList, selectList } = useListStore();
  const { resetFilter, filterByListId } = useFilterStore();

  useEffect(() => {
    if (selectedListId !== null) {
      filterByListId(selectedListId);
    } else {
      resetFilter();
    }
    filterByListId;
  }, [selectedListId, , resetFilter]);

  const handleListClick = (id: number) => {
    if (selectedListId === id) {
      deselectList();
      resetFilter();
    } else {
      selectList(id);
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
            isSelected={selectedListId === list.id}
            onClick={() => handleListClick(list.id)}
          />
        ))}
      </ScrollArea>
    </div>
  );
}
