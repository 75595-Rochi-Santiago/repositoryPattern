import { createPool } from "mysql2/promise"; //para permitir promesas

export default createPool({
  host: process.env.db_mysql_host,
  user: process.env.db_mysql_user,
  password: process.env.db_mysql_password,
  database: process.env.db_mysql_database,
  decimalNumbers: true, //reconocer numeros en el mapeo, no como strings
});
