module.exports = {
  client: {
    includes: ["app/**/*", "lib/graphql/*"],
    service: {
      name: "sepolia",
      localSchemaFile: "./graphql.schema.json",
    },
  },
};
