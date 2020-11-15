import { EffectEmitter, EffectHandler } from '../EffectEmitter';

class ConcreteEffectEmitter extends EffectEmitter<string> {
  public dispatch(effect: string) {
    this.handleEffect(effect);
  }
}

const createEffectHandler = (): EffectHandler<string> => ({ handle: jest.fn() });

describe('EffectEmitter', () => {
  let emitter: ConcreteEffectEmitter;

  beforeEach(() => {
    emitter = new ConcreteEffectEmitter();
  });

  it('creates', () => {
    expect(emitter).toBeDefined();
  });

  it('allows to register an effect handler', () => {
    const effectHandlerMock = createEffectHandler();

    const message = 'buffalo';
    emitter.addEffectHandler(effectHandlerMock);
    emitter.dispatch(message);

    expect(effectHandlerMock.handle).toHaveBeenCalledWith(message);
  });

  describe('multiple effect handlers', () => {
    let message = 'buffalo';
    let effectHandlerMock1: EffectHandler<string>;
    let effectHandlerMock2: EffectHandler<string>;

    beforeEach(() => {
      effectHandlerMock1 = createEffectHandler();
      effectHandlerMock2 = createEffectHandler();
    });

    it('allows to register multiple effect handlers', () => {
      emitter.addEffectHandler(effectHandlerMock1);
      emitter.addEffectHandler(effectHandlerMock2);
      emitter.dispatch(message);

      expect(effectHandlerMock1.handle).toHaveBeenCalledWith(message);
      expect(effectHandlerMock2.handle).toHaveBeenCalledWith(message);
    });

    it('still calls other handlers if one has been removed', () => {
      emitter.addEffectHandler(effectHandlerMock1);
      emitter.addEffectHandler(effectHandlerMock2);
      emitter.removeEffectHandler(effectHandlerMock1);
      emitter.dispatch(message);

      expect(effectHandlerMock1.handle).not.toHaveBeenCalled();
      expect(effectHandlerMock2.handle).toHaveBeenCalledWith(message);
    });
  });

  it('allows to unregister effect handler', () => {
    const effectHandler = createEffectHandler();

    emitter.addEffectHandler(effectHandler);
    emitter.removeEffectHandler(effectHandler);
    emitter.dispatch('buffalo');

    expect(effectHandler.handle).not.toHaveBeenCalled();
  });

  it('allows to add the same effect handler multiple times', () => {
    const message = 'buffalo';
    const effectHandler = createEffectHandler();

    emitter.addEffectHandler(effectHandler);
    emitter.addEffectHandler(effectHandler);
    emitter.dispatch(message);

    expect(effectHandler.handle).toHaveBeenCalledTimes(2);
    expect(effectHandler.handle).toHaveBeenNthCalledWith(1, message);
    expect(effectHandler.handle).toHaveBeenNthCalledWith(2, message);
  });

  it('removes a handler that was added multiple times at once', () => {
    const effectHandlerMock1 = createEffectHandler();
    const effectHandlerMock2 = effectHandlerMock1;

    emitter.addEffectHandler(effectHandlerMock1);
    emitter.addEffectHandler(effectHandlerMock2);
    emitter.removeEffectHandler(effectHandlerMock1);
    emitter.dispatch('buffalo');

    expect(effectHandlerMock1.handle).not.toHaveBeenCalled();
    expect(effectHandlerMock2.handle).not.toHaveBeenCalled();
  });

  it('does not remove anything if given a reference to unregistered handler', () => {
    const message = 'buffalo'
    const effectHandler = createEffectHandler();

    emitter.addEffectHandler(effectHandler);
    emitter.removeEffectHandler(createEffectHandler());
    emitter.dispatch(message);

    expect(effectHandler.handle).toHaveBeenCalledWith(message);
  });
});
