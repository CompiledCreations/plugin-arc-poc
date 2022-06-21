console.error("This plugin should never be loaded");

export function render(): any {
  throw new Error("I must not be loaded!");
}
