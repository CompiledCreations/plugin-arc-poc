import { useContext } from "react";

import { Context } from "./context";
import { singleton } from "./singleton";

import "./plugin-module-b.css";

export function pluginModuleB() {
  singleton.counter++;
  return `I am a plugin module B, singleton.counter = ${singleton.counter}`;
}

export function render() {
  return <PluginModuleBComponent />;
}

const PluginModuleBComponent = () => {
  const { test } = useContext(Context);
  return (
    <div className="plugin-module-b-container">
      <h1>Plugin Module B</h1>
      <p>{pluginModuleB()}</p>
      <p>Value from root context: {test}</p>
    </div>
  );
};
