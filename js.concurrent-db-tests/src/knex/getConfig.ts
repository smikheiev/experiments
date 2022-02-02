const defaultConfig = {
  client: "pg",
  connection: {
    database: "development",
    user: "postgres",
    password: "postgres",
  },
};

export default function getConfig() {
  if (process.env.NODE_ENV === "test") {
    return getTestConfig();
  }

  return defaultConfig;
}

function getTestConfig() {
  return {
    ...defaultConfig,
    connection: {
      ...defaultConfig.connection,
      database: "test",
    },
  };
}
