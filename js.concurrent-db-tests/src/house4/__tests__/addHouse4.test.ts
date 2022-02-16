import { knex } from "../../knex";
import addHouse from "../addHouse4";

it("should add house", async () => {
  await addHouse("foo", "bar");
  const addedHouses = await knex.table("house4").select();
  expect(addedHouses).toEqual([
    {
      id: expect.any(String),
      houseName: "foo",
      headName: "bar",
    },
  ]);
});

it("should return added house", async () => {
  const returnedHouse = await addHouse("boo", "baz");
  const addedHouse = await knex.table("house4").select().first();
  expect(returnedHouse).toEqual(addedHouse);
});
