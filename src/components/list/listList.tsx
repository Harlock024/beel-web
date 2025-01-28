import { ListCard } from "./listCard";
import useListStore from "./store/listStore";

export function ListList() {
  const { lists } = useListStore();
  return (
    <div className="flex flex-col  font-semibold ">
      {lists.map((list) => (
        <ListCard key={list.id} list={list} />
      ))}
    </div>
  );
}
