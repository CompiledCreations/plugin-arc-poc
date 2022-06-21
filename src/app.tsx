import * as React from "react";
import { createRoot } from "react-dom/client";

import { Context } from "./context";

const pluginLoader = [
  import(/* webpackChunkName: "plugins/plugin-module-a" */ "./plugin-module-a").then((module) => {
    console.log("Main loaded:", module.pluginModuleA());
    return module;
  }),
  import(/* webpackChunkName: "plugins/plugin-module-b" */ "./plugin-module-b").then((module) => {
    console.log("Main loaded:", module.pluginModuleB());
    return module;
  }),
];

Promise.allSettled(pluginLoader).then((results) => {
  const plugins = results.map((result) => result.status === "fulfilled" ? result.value : null).filter(Boolean);

  const root = createRoot(document.getElementById("root"));
  root.render(
    <Context.Provider value={{ test: "From root" }}>
      <div>
        {plugins.map((p, index) => (
          <React.Fragment key={index}>{p.render()}</React.Fragment>
        ))}
      </div>
    </Context.Provider>
  );
});
