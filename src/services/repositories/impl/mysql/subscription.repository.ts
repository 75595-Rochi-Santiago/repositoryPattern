import connector from "../../../../common/persistence/mysql.persistence";
import { Subscription } from "../../domain/subscription";
import { SubscriptionRepository } from "../../subscription.repository";

export class SubscriptionMySQLRepository implements SubscriptionRepository {
  //     METODOS LECTURA
  public async all(): Promise<Subscription[]> {
    //como trabajamos con codigo sinctrono, debe ser una promesa en vez de solo "Subscription[]"
    //puedo usar async gracias a "mysql2/promise"
    const [rows] = await connector.execute(
      //execute usa promesas
      "SELECT * FROM wallet_subscription ORDER BY id DESC"
    );
    return rows as Subscription[]; //indicar que rows es de tipo Subscription y va a ser un arreglo atravez de un casteo
  }

  public async find(id: number): Promise<Subscription | null> {
    //puedo usar async gracias a "mysql2/promise"
    const [rows]: any[] = await connector.execute(
      //casteo como array tipo any[] para poder usar la propiedad length
      "SELECT * FROM wallet_subscription WHERE id = ?",
      [id]
    );
    if (rows.length) {
      return rows[0] as Subscription; //devolver primer elemento
    }
    return null;
  }

  public async findByUserAndCode(
    user_id: number,
    code: string
  ): Promise<Subscription | null> {
    const [rows]: any[] = await connector.execute(
      "SELECT * FROM wallet_subscription WHERE user_id = ? AND code=?",
      [user_id, code]
    );
    if (rows.length) {
      return rows[0] as Subscription; //devolver primer elemento
    }
    return null;
  }

  //          METODOS ESCRITURA
  public async store(entry: Subscription): Promise<void> {
    const nowDate = Date();
    await connector.execute(
      "INSERT INTO wallet_subscription(user_id, code, amount, cron, created_at,) VALUES (?, ?, ?, ?, ?)"
    ),
      [entry.user_id, entry.code, entry.amount, entry.cron, nowDate];
  }

  public async update(entry: Subscription): Promise<void> {
    const nowDate = Date();
    await connector.execute(
      "UPDATE wallet_subscription SET user_id=?, code=?, amount=?, cron=?, update_at=? WHERE id=?"
    ),
      [entry.user_id, entry.code, entry.amount, entry.cron, nowDate, entry.id];
  }

  public async remove(id: number): Promise<void> {
    await connector.execute("DELETE FROM wallet_subscription WHERE id=?"), [id];
  }
}
