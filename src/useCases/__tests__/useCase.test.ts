import { EffectHandler } from '../EffectHandler';
import UseCase from '../useCase';

class AUseCase extends UseCase<string> {
  public dispatch(effect: string) {
    this.handleEffect(effect);
  }
}

const createEffectHandler = (): EffectHandler<string> => ({ handle: jest.fn() });

describe('UseCase', () => {
  let useCase: AUseCase;

  beforeEach(() => {
    useCase = new AUseCase();
  });

  it('creates', () => {
    expect(useCase).toBeDefined();
  });

  it('allows to register an effect handler', () => {
    const effectHandlerMock = createEffectHandler();

    const message = 'buffalo';
    useCase.addEffectHandler(effectHandlerMock);
    useCase.dispatch(message);

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
      useCase.addEffectHandler(effectHandlerMock1);
      useCase.addEffectHandler(effectHandlerMock2);
      useCase.dispatch(message);

      expect(effectHandlerMock1.handle).toHaveBeenCalledWith(message);
      expect(effectHandlerMock2.handle).toHaveBeenCalledWith(message);
    });

    it('still calls other handlers if one has been removed', () => {
      useCase.addEffectHandler(effectHandlerMock1);
      useCase.addEffectHandler(effectHandlerMock2);
      useCase.removeEffectHandler(effectHandlerMock1);
      useCase.dispatch(message);

      expect(effectHandlerMock1.handle).not.toHaveBeenCalled();
      expect(effectHandlerMock2.handle).toHaveBeenCalledWith(message);
    });
  });

  it('allows to unregister effect handler', () => {
    const effectHandler = createEffectHandler();

    useCase.addEffectHandler(effectHandler);
    useCase.removeEffectHandler(effectHandler);
    useCase.dispatch('buffalo');

    expect(effectHandler.handle).not.toHaveBeenCalled();
  });

  it('allows to add the same effect handler multiple times', () => {
    const message = 'buffalo';
    const effectHandler = createEffectHandler();

    useCase.addEffectHandler(effectHandler);
    useCase.addEffectHandler(effectHandler);
    useCase.dispatch(message);

    expect(effectHandler.handle).toHaveBeenCalledTimes(2);
    expect(effectHandler.handle).toHaveBeenNthCalledWith(1, message);
    expect(effectHandler.handle).toHaveBeenNthCalledWith(2, message);
  });

  it('removes a handler that was added multiple times at once', () => {
    const effectHandlerMock1 = createEffectHandler();
    const effectHandlerMock2 = effectHandlerMock1;

    useCase.addEffectHandler(effectHandlerMock1);
    useCase.addEffectHandler(effectHandlerMock2);
    useCase.removeEffectHandler(effectHandlerMock1);
    useCase.dispatch('buffalo');

    expect(effectHandlerMock1.handle).not.toHaveBeenCalled();
    expect(effectHandlerMock2.handle).not.toHaveBeenCalled();
  });

  it('does not remove anything if given a reference to unregistered handler', () => {
    const message = 'buffalo'
    const effectHandler = createEffectHandler();

    useCase.addEffectHandler(effectHandler);
    useCase.removeEffectHandler(createEffectHandler());
    useCase.dispatch(message);

    expect(effectHandler.handle).toHaveBeenCalledWith(message);
  });
});
