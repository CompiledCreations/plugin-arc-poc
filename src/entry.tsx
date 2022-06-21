import(/* webpackChunkName: "app" */ "./app")
  .then(() => {
    console.log("loaded");
  })
  .catch((error) => console.error("Failed to load app", error));
