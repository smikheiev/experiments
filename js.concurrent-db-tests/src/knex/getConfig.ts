const defaultConfig = {
  client: "pg",
  connection: {
    database: "development",
    user: "postgres",
    password: "postgres",
  },
};

type ConfigOptions = {
  withoutDbName?: boolean;
};

export default function getConfig({ withoutDbName }: ConfigOptions = {}) {
  if (process.env.NODE_ENV === "test") {
    return getTestConfig(withoutDbName ? undefined : "test");
  }

  return defaultConfig;
}

function getTestConfig(dbName: string | undefined) {
  return {
    ...defaultConfig,
    connection: {
      ...defaultConfig.connection,
      database: dbName,
    },
  };
}
