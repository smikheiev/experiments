# Idea

I wanted to check how to run in parallel unit tests with database integration, to increase tests speed.

# Results

After all, it's pretty easy to do. The basic steps are:
1. create "template" database
  ```
  await knex.raw(`DROP DATABASE IF EXISTS ${templateDbName}`)
  await knex.raw(`CREATE DATABASE ${templateDbName}`)
  ```
2. run knex migrations for the "template" database
  ```
  await knex.migrate.latest()
  ```
3. create "worker" databases for each jest worker using the "template" database
  ```
  await knex.raw(`DROP DATABASE IF EXISTS ${workerDbName}`)
  await knex.raw(`CREATE DATABASE ${workerDbName} TEMPLATE ${templateDbName}`)
  ```
4. connect to the "worker" database
  ```
  const dbName = `test_${process.env.JEST_WORKER_ID}`
  ```

This will allow to run tests in parallel and increase the overall tests speed (it won't be visible on this small project, but in a real project with hundreads and more tests the speed can be increased significantly :rocket:).

**Worth to mention** that for steps 1 and 3 the database config (or connection string) should _not_ have database name set, otherwise the `drop` query will fail (because the database can't be dropped when it has an active connection).

# How to use

```
cd js.concurrent-db-tests
yarn
```

To start docker with database:
```
yarn dev:docker
```

To run tests:
```
yarn test
```
