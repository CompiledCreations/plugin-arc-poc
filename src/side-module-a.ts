import { singleton } from "./singleton";

export function sideModuleA() {
  singleton.counter++;
  return `I am a side module A, singleton.counter = ${singleton.counter}`;
}
