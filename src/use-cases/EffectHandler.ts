export interface EffectHandler<T> {
  handle(effect: T): void;
}
