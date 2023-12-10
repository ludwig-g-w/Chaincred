module.exports = {
  client: {
    includes: ["app/**/*"],
    service: {
      name: "sepolia",
      localSchemaFile: "./graphql.schema.json",
    },
  },
};
