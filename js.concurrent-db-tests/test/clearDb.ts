import { knex } from "../src/knex";

export default async function clearDb() {
  const tables = await knex("information_schema.tables")
    .select({ tableName: "table_name" })
    .where({ table_schema: "public", table_type: "BASE TABLE" })
    .whereNotIn("table_name", ["knex_migrations", "knex_migrations_lock"]);
  const tableNames = tables.map(({ tableName }) => `"${tableName}"`).join(", ");
  await knex.raw(`TRUNCATE TABLE ${tableNames} RESTART IDENTITY CASCADE`);
}
