import { v4 as uuidv4 } from "uuid";
import { knex } from "../knex";

export default async function addUser(firstName: string, lastName: string) {
  return knex
    .table("user")
    .insert({ id: uuidv4(), firstName, lastName })
    .returning("*")
    .then((users) => users[0]);
}
