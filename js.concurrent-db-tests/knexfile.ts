import getConfig from "./src/knex/getConfig";

export default {
  ...getConfig(),
  migrations: {
    directory: "./migrations",
  },
};
