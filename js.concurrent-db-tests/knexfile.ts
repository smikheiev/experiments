import config from "./src/knex/config";

export default {
  ...config,
  migrations: {
    directory: "./migrations",
  },
};
