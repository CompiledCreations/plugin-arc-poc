import { useContext } from "react";

import { Context } from "./context";
import { singleton } from "./singleton";

import "./side-module-b.css";

export function sideModuleB() {
  singleton.counter++;
  return `I am a side module B, singleton.counter = ${singleton.counter}`;
}

export function render() {
  return <SideModuleBComponent />;
}

const SideModuleBComponent = () => {
  const { test } = useContext(Context);
  return (
    <div className="side-module-b-container">
      <h1>Side Module B</h1>
      <p>{sideModuleB()}</p>
      <p>Value from root context: {test}</p>
    </div>
  );
};
