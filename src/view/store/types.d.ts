import { createStore } from "./index";

declare namespace Store {
  const store = createStore();
  export type Dispatch = typeof store.dispatch;
  export type State = ReturnType<typeof store.getState>;
  export type Store = typeof store;
}
