# Plugin Architecture Proof of Concept

## Introduction

To support flexibly loading features at runtime we would like to employ a plugin architecture. This document outlines how webpack may be configured to support a simple way of doing this. Plugins are simply defined by dynamically importing modules, then webpack takes care of code splitting and module caching to reduce code size and ensure the correct runtime behaviour.

While we outline how such a system can be configured, we don't specify how the actual plugin implementation will work. This could be as simple as dynamically importing modules based on some feature flags, or a more complex system with a defined plugin interface. Either design should work with the specified configuration.

## Code Layout

Our project consists of a single entry point. The entry point dynamically imports modules, which can be thought of as plugins. Each module has some code that is unique to it and shares other code that is common to all modules.

We require that instances of common modules are correctly shared so that features like React Context work correctly when components render across different modules.

## TSConfig

To support dynamic imports and code splitting correctly we need `module: "esnext"`.

## Webpack

We can use Webpack to automatically generate plugins using its support for dynamic imports and code splitting.

### Dynamic Imports

Using dynamic imports means that those modules are automatically split into their own chunks. This has the benefit of reducing complexity as we don't need to worry about defining multiple entry points all chunks will be automatically loaded when required by the main chunk.

Plugins are registered by dynamically importing them inside the plugin loader. We can use Webpack magic comments to assign specific names to the output chunks and control where they are output to in the dist folder.

The following code would import a plugin from current modules path. The plugin is written to an appropriately named chunk in the output "plugins" folder.

```
const plugin = await import(/* webpackChunkName: "plugins/plugin-module" */ "./plugin-module")
```

As long as plugins are statically registered by the import statement, they can be dynamically loaded at run time. This means we can use configuration at runtime to pick the plugins to actually load. We can also remove plugin chunks from the shipping product to prevent plugins ever being loaded.

### Common Chunks

Each plugin is automatically written to its own chunk, however we need to split code so that plugins can share code and most importantly share instances of modules at runtime. If not done correctly the plugins will duplicate code and be unable to share resources with the rest of the application. To do this we use the SplitChunks plugin and it's cache groups feature.

Cache groups is configured to split all shared code to a common chunk. Using `minChunks: 2` means move to the shared chunk if a module is used by more than one chunk. We need to use `minSize: 0` to force all shared chunks to be split, regardless of their size.

Webpack's module caching system allows module instances to be shared at runtime. This means that things like React Contexts and singletons can be easily shared across the application.

### Vendor Chunks

A common optimization for Webpack projects is to split all code from node_modules into a separate "vendor" chunk. This improves build speed and improves caching behaviour as the runtime chunk doesn't update as often as the chunks generated from our own code.

Normally the vendor chunk has to be imported manually, this is usually hidden by plugins such as HtmlWebpackPlugin. However, for our library we don't want the client to have to manually add a script tag to load our vendor chunk. Again, we can use dynamic imports to resolve this problem.

If make our main entry point module do nothing but load in the module containing the application and all the vendor dependencies, the need to manually load the vendor chunk goes away.

## Bringing it all Together

The outcome of this work is a relatively simple plugin architecture. It allows plugins to be selectively loaded at runtime based on some configuration by the client. It allows plugin distribution to be entirely optional, as plugins can safely be removed from the distributed library or application. All this is possible while allowing code reuse within a single codebase without the need to create multiple packages or webpack configuration.
