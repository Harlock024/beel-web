import type { Sticker } from "@/types/stickers";
import { type FormEvent, useState } from "react";
import { StickerCard } from "./StickerCard";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus } from "lucide-react";

const STICKER_COLORS = [
  "#fef9c3", // Pastel yellow
  "#dcfce7", // Pastel mint
  "#fce7f3", // Pastel pink
  "#fde4cf", // Pastel peach
];

export function StickerWall() {
  const [stickers, setStickers] = useState<Sticker[]>([]);
  console.log(stickers);
  function addSticker(e: FormEvent) {
    e.preventDefault();
    const newSticker: Sticker = {
      id: Math.floor(Math.random() * 1000),
      title: "",
      description: "",
      color: STICKER_COLORS[stickers.length % STICKER_COLORS.length],
    };
    setStickers((prev) => [...prev, newSticker]);
  }
  // function updateSticker(updatedSticker: Sticker) {
  //   if (!updatedSticker.id) {
  //     console.error("Invalid sticker ID");
  //     return;
  //   }

  //   setStickers((prev) => {
  //     const exists = prev.some((sticker) => sticker.id === updatedSticker.id);
  //     if (!exists) {
  //       console.warn("Sticker not found for update:", updatedSticker.id);
  //     }
  //     return prev.map((sticker) =>
  //       sticker.id === updatedSticker.id ? updatedSticker : sticker,
  //     );
  //   });
  // }
  function updateSticker(updatedSticker: Sticker) {
    setStickers((prev) =>
      prev.map((sticker) =>
        sticker.id === updatedSticker.id ? updatedSticker : sticker,
      ),
    );
  }

  function deleteSticker(id: number) {
    setStickers((prev) => prev.filter((sticker) => sticker.id !== id));
  }

  return (
    <div className="flex flex-col min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-8">Sticky Wall</h1>
      <ScrollArea className="flex-grow">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {stickers.map((sticker) => (
            <StickerCard
              key={sticker.id}
              sticker={sticker}
              onUpdate={updateSticker}
              onDelete={deleteSticker}
            />
          ))}
          <button
            onClick={addSticker}
            className="flex items-center justify-center h-[200px] border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 transition-colors"
          >
            <Plus className="h-8 w-8 text-gray-400" />
          </button>
        </div>
      </ScrollArea>
    </div>
  );
}
