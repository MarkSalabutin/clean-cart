export interface EffectHandler<T> {
  handle(effect: T): void;
}

export abstract class EffectEmitter<T> {
  private handlers: EffectHandler<T>[] = [];

  protected handleEffect(effect: T) {
    this.handlers.forEach(handler => handler.handle(effect));
  }

  public addEffectHandler(handler: EffectHandler<T>) {
    this.handlers.push(handler);
  }

  public removeEffectHandler(handler: EffectHandler<T>) {
    this.handlers = this.handlers.filter(h => h !== handler);
  }
}
