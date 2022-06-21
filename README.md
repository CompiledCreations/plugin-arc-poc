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

We need to split code in a way so that dynamically imported modules such as plugins can share code and most importantly share instances of modules at runtime. To do this we use the SplitChunks plugin and it's cache groups feature.

Cache groups is configured so split all shared code to a common chunk. using `minChunks: 2` means move to the shared chunk if a module is used by more than one chunk. We need to use `minSize: 0` to force all shared chunks to be split, regardless of their size.

Even if chunks aren't split. It seems that Webpack's module caching system allows instances to be shared at runtime. This is an clear advantage of using Webpack over Rollup.

### Dynamic Imports

Using dynamic imports means that those modules are automatically split into their own chunks. This has the benefit of reducing complexity as we don't need to worry about defining multiple entry points all chunks will be automatically loaded when required by the main chunk.

### Vendor Chunks