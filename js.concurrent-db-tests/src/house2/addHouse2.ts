import { v4 as uuidv4 } from "uuid";
import { knex } from "../knex";

export default function addHouse(houseName: string, headName: string) {
  return knex
    .table("house2")
    .insert({ id: uuidv4(), houseName, headName })
    .returning("*")
    .then((houses) => houses[0]);
}
