import * as React from "react";
import { createRoot } from "react-dom/client";

import { Context } from "./context";

// Flag to prevent plugin from attempting to load
const loadMissingPlugin = false;

// Register plugins using dynamic imports
const pluginLoader = [
  import(/* webpackChunkName: "plugins/plugin-module-a" */ "./plugin-module-a"),
  import(/* webpackChunkName: "plugins/plugin-module-b" */ "./plugin-module-b"),
  loadMissingPlugin ? import(/* webpackChunkName: "plugins/missing-plugin" */ "./missing-plugin") : Promise.reject(),
];

// Once all plugins are loaded, create the root element and render the app. We have a root context that can be
// accessed by all the plugins proving that code splitting and sharing is working.
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
