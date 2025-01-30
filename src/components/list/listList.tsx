import { ScrollArea } from "../ui/scroll-area";
import { ListCard } from "./listCard";
import useListStore from "./store/listStore";

export function ListList() {
  const { lists } = useListStore();
  return (
    <div className="flex flex-col h-auto box-border  font-semibold ">
      <ScrollArea className="w-full">
        {lists.map((list) => (
          <ListCard key={list.id} list={list} />
        ))}
      </ScrollArea>
    </div>
  );
}
