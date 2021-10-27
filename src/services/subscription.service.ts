import { Subscription } from "./repositories/domain/subscription";
import { SubscriptionRepository } from "./repositories/subscription.repository";
import { AplicationException } from "../common/exceptions/application.exception";
//inyectar repositorio
export class SubscriptionService {
  constructor(
    private readonly subscriptionRepository: SubscriptionRepository //del tipo de la interface creada
  ) {}
  //metodos para manipular el repositorio
  public async all(): Promise<Subscription[]> {
    return await this.subscriptionRepository.all();
  }
  public async find(id: number): Promise<Subscription | null> {
    return await this.subscriptionRepository.find(id);
  }
  public async store(entry: SubscriptionCreateDto): Promise<void> {
    //como necesito un objeto personalizado, uno un obj dto
    const originalEntry = await this.subscriptionRepository.findByUserAndCode(
      entry.user_id,
      entry.code
    );
    if (!originalEntry) {
      await this.subscriptionRepository.store(entry as Subscription); //transformo en entidad Subscription
    } else {
      throw new AplicationException("User subscripted alredy exists.");
    }
  }

  public async update(id: number, entry: SubscriptionUpdateDto): Promise<void> {
    const originalEntry = await this.subscriptionRepository.find(id);
    if (originalEntry) {
      originalEntry.code = entry.code;
      originalEntry.amount = entry.amount;
      originalEntry.cron = entry.cron;
    } else {
      throw new AplicationException("User subscription alredy exists.");
    }
  }
  public async remove(id: number): Promise<void> {
    return await this.subscriptionRepository.remove(id);
  }
}
