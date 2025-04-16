import { TagsForm } from "../tags/tagsForm";
import { TagsList } from "../tags/TagsList";

export function SidebarTags({ className }: { className: string }) {
  return (
    <div className={className}>
      <h1>Tags</h1>
      <TagsList />
      <TagsForm />
    </div>
  );
}
