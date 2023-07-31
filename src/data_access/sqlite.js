import Database from "better-sqlite3";
import cnf from "../cnf.js";

const db = Database(cnf.dbConnectionString)

export default db
