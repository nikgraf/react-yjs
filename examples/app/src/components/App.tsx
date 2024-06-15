import React from "react";
import { DeepStructure } from "./DeepStructure";
import { Settings } from "./Settings";
import { Todos } from "./Todos";

export const App: React.FC = () => {
  return (
    <>
      <h2>Settings Example</h2>
      <Settings />
      <hr />
      <h2>Todos Example</h2>
      <Todos />
      <hr />
      <h2>Deep Structure Example</h2>
      <DeepStructure />
    </>
  );
};
