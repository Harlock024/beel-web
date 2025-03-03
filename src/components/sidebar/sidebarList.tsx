import { ListForm } from "../list/listForm";
import { ListList } from "../list/listList";

export function MenuList() {
  return (
    <div className="flex flex-col font-semibold ">
      <h1 className="text-sm font-semibold">Lists</h1>
      <ListList />
      <ListForm />
    </div>
  );
}
