import { knex } from "../../knex";
import addUser from "../addUser2";

it("should add user", async () => {
  await addUser("foo", "bar");
  const addedUsers = await knex.table("user2").select();
  expect(addedUsers).toEqual([
    {
      id: expect.any(String),
      firstName: "foo",
      lastName: "bar",
    },
  ]);
});

it("should return added user", async () => {
  const returnedUser = await addUser("boo", "baz");
  const addedUser = await knex.table("user2").select().first();
  expect(returnedUser).toEqual(addedUser);
});
