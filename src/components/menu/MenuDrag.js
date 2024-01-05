import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import MenuContainer from "./MenuContainer";

export default function MenuDrag() {
  return (
    <div>
      <DndProvider backend={HTML5Backend}>
        <MenuContainer />
      </DndProvider>
    </div>
  );
}
