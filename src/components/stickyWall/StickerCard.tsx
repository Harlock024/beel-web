import { FormEvent, useState } from "react";
import type { Sticker } from "@/types/stickers";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Pen, X } from "lucide-react";
import { Button } from "../ui/button";

interface StickerCardProps {
  sticker: Sticker;
  onUpdate: (sticker: Sticker) => void;
  onDelete: (id: number) => void;
}

export function StickerCard({ sticker, onUpdate, onDelete }: StickerCardProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editView, setEditView] = useState(true);

  function handleEditView() {
    setEditView(!editView);
  }

  function handleOnDelete(e: FormEvent) {
    e.preventDefault();
    onDelete(sticker.id!);
  }
  function handleSave() {
    const updatedSticker = { ...sticker, title, description };
    onUpdate(updatedSticker);
    setEditView(!editView);
  }
  return (
    <Card
      className="p-4 min-h-[200px] transform transition-transform hover:scale-105 cursor-pointer"
      style={{ backgroundColor: sticker.color }}
    >
      <button
        type="button"
        className="flex  w-full justify-end "
        onClick={handleOnDelete}
      >
        <X className="" />
      </button>
      <Input
        disabled={editView}
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter title..."
        className="text-lg font-semibold mb-2 border-none bg-transparent focus-visible:ring-0 p-0"
      />
      <Textarea
        disabled={editView}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Enter description..."
        className="border-none bg-transparent focus-visible:ring-0 resize-none p-0 min-h-[120px]"
      />
      <div className="flex gap-2">
        {editView ? (
          <Pen onClick={handleEditView} className="w-5" />
        ) : (
          <Button
            type="button"
            className={editView ? "hidden" : ""}
            onClick={handleSave}
          >
            save
          </Button>
        )}
      </div>
    </Card>
  );
}
