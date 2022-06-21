// import { singleton } from "./singleton";

import("./side-module-a").then((module) => console.log("Main loaded:", module.sideModuleA()));
import("./side-module-b").then((module) => console.log("Main loaded:", module.sideModuleB()));

// console.log("I am the main bundle", singleton.counter++);