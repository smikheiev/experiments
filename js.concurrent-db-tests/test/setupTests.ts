import { knex } from "../src/knex";
import clearDb from "./clearDb";

beforeEach(async () => {
  await clearDb();
});

afterAll(async () => {
  await knex.destroy();
});
