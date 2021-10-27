import { Subscription } from "./domain/subscription";
//INTERFACE, SOLO EXPONE LOS METODOS, NO TIENE IMPLEMENTACION, ES UN CONTRATO
export interface SubscriptionRepository {
  all(): Promise<Subscription[]>;
  find(id: number): Promise<Subscription | null>;
  findByUserAndCode(
    user_id: number,
    code: string
  ): Promise<Subscription | null>;
  store(entry: Subscription): Promise<void>;
  update(entry: Subscription): Promise<void>;
  remove(id: number): Promise<void>;
}
