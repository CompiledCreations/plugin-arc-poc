import * as React from "react";
import { createRoot } from "react-dom/client";

import { Context } from "./context";

const pluginLoader = [
  import("./side-module-a").then((module) => {
    console.log("Main loaded:", module.sideModuleA());
    return module;
  }),
  import("./side-module-b").then((module) => {
    console.log("Main loaded:", module.sideModuleB());
    return module;
  }),
];

Promise.all(pluginLoader).then((plugins) => {
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
