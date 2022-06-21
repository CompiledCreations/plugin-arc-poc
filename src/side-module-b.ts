import { singleton } from "./singleton";

export function sideModuleB() {
  singleton.counter++;
  return `I am a side module B, singleton.counter = ${singleton.counter}`;
}
