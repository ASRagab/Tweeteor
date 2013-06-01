Package.describe({
      summary: "Asynchronous Twitter client API for node.js"
});

Npm.depends({ntwitter: "0.5.0"});

Package.on_use(function (api) {
      api.add_files("ntwitter.js", "server");
});
