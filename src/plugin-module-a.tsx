import { useContext } from "react";

import { Context } from "./context";
import { singleton } from "./singleton";

import "./plugin-module-a.css";

export function pluginModuleA() {
  singleton.counter++;
  return `I am a plugin module A, singleton.counter = ${singleton.counter}`;
}

export function render() {
  return <PluginModuleAComponent />;
}

const PluginModuleAComponent = () => {
  const { test } = useContext(Context);
  return (
    <div className="plugin-module-a-container">
      <h1>Plugin Module A</h1>
      <p>{pluginModuleA()}</p>
      <p>Value from root context: {test}</p>
    </div>
  );
};
