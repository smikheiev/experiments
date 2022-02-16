import "ts-node/register/transpile-only"; // this is needed to avoid 'Cannot use import statement outside a module' error
import Knex from "knex";
import getConfig from "../src/knex/getConfig";

type JestConfig = {
  maxWorkers: number;
};

export default async function ({ maxWorkers }: JestConfig) {
  console.log("Jest global setup");
  await recreateTestDb();
  await runMigrations();
  await createWorkerDbs(maxWorkers);
}

async function recreateTestDb() {
  const knex = Knex(getConfig({ withoutDbName: true }));

  const dbName = "test";
  await knex.raw(`DROP DATABASE IF EXISTS ${dbName}`);
  await knex.raw(`CREATE DATABASE ${dbName}`);

  await knex.destroy();
}

async function runMigrations() {
  const knex = Knex(getConfig({ withoutDbName: false }));
  await knex.migrate
    .latest()
    .then((res) => {
      console.log(`Migrations were successfully run: ${res}`);
    })
    .catch((e) => {
      console.error(`Error while running migrations: ${e}`);
    })
    .finally(() => {
      knex.destroy();
    });
}

async function createWorkerDbs(maxWorkers: number) {
  const knex = Knex(getConfig({ withoutDbName: true }));

  console.log(`Create ${maxWorkers} worker dbs`);
  for (let i = 1; i <= maxWorkers; i++) {
    const templateDbName = "test";
    const workerDbName = `test_${i}`;
    await knex.raw(`DROP DATABASE IF EXISTS ${workerDbName}`);
    await knex.raw(
      `CREATE DATABASE ${workerDbName} TEMPLATE ${templateDbName}`
    );
  }

  await knex.destroy();
}
