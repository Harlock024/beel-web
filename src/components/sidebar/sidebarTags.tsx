import { TagsForm } from "../tags/tagsForm";
import { TagsList } from "../tags/TagsList";

export function SidebarTags() {
  return (
    <div className="flex flex-col h-1/2 ">
      <h1>Tags</h1>
      <TagsList />
    </div>
  );
}
