import { ScrollArea } from "../ui/scroll-area";
import { ListCard } from "./listCard";
import useListStore from "./store/listStore";
import useTask from "../task/store/TaskStore";
import { useEffect } from "react";

export function ListList() {
  const { lists, selectedListId, deselectList, selectList } = useListStore();
  const { ListIdFiltered, resetFilter } = useTask();

  useEffect(() => {
    if (selectedListId !== null) {
      ListIdFiltered(selectedListId);
    } else {
      resetFilter();
    }
  }, [selectedListId, ListIdFiltered, resetFilter]);

  const handleListClick = (id: number) => {
    if (selectedListId === id) {
      deselectList();
      resetFilter();
    } else {
      selectList(id);
      ListIdFiltered(id);
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
