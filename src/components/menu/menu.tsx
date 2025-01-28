import React from "react";
import { MenuTask } from "./menuTask";
import { MenuList } from "./menuList";

export function MenuApp() {
  return (
    <div className="flex h-screen  border border-red-600">
      <div className="flex flex-col w-full h-full border border-red-600">
        <h1 className="flex flex-col size-1/6">Beel</h1>
        <MenuTask />
        <MenuList />
        <div className="flex flex-col h-1/2 bg-gray-600">tags</div>

        <div>Settings</div>
        <div>Sign out</div>
      </div>
    </div>
  );
}
