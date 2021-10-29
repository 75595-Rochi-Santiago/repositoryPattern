import { createPool } from "mysql2/promise"; //para permitir promesas

export default createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "kodoti_wallet",
  decimalNumbers: true, //reconocer numeros en el mapeo, no como strings
});
