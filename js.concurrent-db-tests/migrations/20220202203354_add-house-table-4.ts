import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("house4", (table) => {
    table.uuid("id").primary();
    table.string("houseName");
    table.string("headName");
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("house4");
}
