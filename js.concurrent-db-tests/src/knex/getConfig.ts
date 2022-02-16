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
    const dbName = process.env.JEST_WORKER_ID
      ? `test_${process.env.JEST_WORKER_ID}`
      : "test";
    console.log("Use db:", dbName);
    return getTestConfig(withoutDbName ? undefined : dbName);
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
