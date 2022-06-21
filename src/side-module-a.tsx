import { useContext } from "react";

import { Context } from "./context";
import { singleton } from "./singleton";

import "./side-module-a.css";

export function sideModuleA() {
  singleton.counter++;
  return `I am a side module A, singleton.counter = ${singleton.counter}`;
}

export function render() {
  return <SideModuleAComponent />;
}

const SideModuleAComponent = () => {
  const { test } = useContext(Context);
  return (
    <div className="side-module-a-container">
      <h1>Side Module A</h1>
      <p>{sideModuleA()}</p>
      <p>Value from root context: {test}</p>
    </div>
  );
};
