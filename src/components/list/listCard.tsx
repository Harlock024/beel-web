import { List } from "@/types/list";
import { Label } from "../ui/label";

export function ListCard({ list }: { list: List }) {
  return (
    <div className="flex items-center w-full  justify-center gap-2">
      <div className="flex  w-full items-center gap-2 ">
        <div className="size-5 rounded-md bg-[#FF475A]"></div>
        <Label className="w-auto font-semibold  ">{list.name}</Label>
      </div>
      <div className="flex bg-gray-300 size-5 mr-2 rounded-sm justify-center items-center">
        {list.numTaskAsigned}
      </div>
    </div>
  );
}
