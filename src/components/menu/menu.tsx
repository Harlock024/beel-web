import React from "react";
import { MenuTask } from "./menuTask";
import { MenuList } from "./menuList";

export function MenuApp() {
  return (
    <div className="flex h-full ">
      <div className="flex flex-col w-full h-full ">
        <h1 className="flex flex-col ">Beel</h1>
        <MenuTask />
        <MenuList />
        <div>Settings</div>
        <div>Sign out</div>
      </div>
    </div>
  );
}
