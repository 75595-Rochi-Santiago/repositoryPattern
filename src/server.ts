import { app } from "./app";

app.listen(3000, () => {
  console.log("Aplicacion corriendo en servidor 3000");
  console.log(process.env.db_mysql_host);
  console.log(process.env.db_mysql_user);
  console.log(process.env.db_mysql_password);
  console.log(process.env.db_mysql_database);
});
