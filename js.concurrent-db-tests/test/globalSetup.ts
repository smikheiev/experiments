import "ts-node/register/transpile-only"; // this is needed to avoid 'Cannot use import statement outside a module' error
import { knex } from "../src/knex";

export default async function () {
  console.log("Jest global setup");
  await runMigrations();
}

async function runMigrations() {
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
