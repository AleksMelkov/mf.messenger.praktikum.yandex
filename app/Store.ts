type State = { [key: string]: any }

export default class Store {
    private subscribers: Function[];

    private reducers: { [key: string]: Function };

    private state: State;

    static __instance:Store;

    constructor(
      reducers:{ [key: string]: Function } = {},
      initialState:{[key: string]: any} = {},
      isNew = false,
    ) {
      if (isNew) {
        Store.__instance = this;
        this.subscribers = [];
        this.reducers = reducers;
        this.state = this.reduce(initialState, {});
      } else {
        Object.keys(reducers).forEach((name) => {
          if (Object.keys(Store.__instance.reducers).includes(name)) {
            throw new Error('Такое название редюссера уже существует');
          }
          Store.__instance.reducers[name] = reducers[name];
        });

        Object.keys(initialState).forEach((name) => {
          if (Object.keys(Store.__instance.state).includes(name)) {
            throw new Error('Такой ключ хранилища уже существует');
          }
          Store.__instance.state[name] = initialState[name];
        });
      }

      if (Store.__instance && !isNew) {
        return Store.__instance;
      }
    }

    get value() {
      return this.state;
    }

    subscribe(fn:Function) {
      this.subscribers = [...this.subscribers, fn];
      fn(this.value);
      return () => {
        this.subscribers = this.subscribers.filter((sub) => sub !== fn);
      };
    }

    dispatch(action:State) {
      this.state = this.reduce(this.state, action);
      this.subscribers.forEach((fn) => fn(this.value));
    }

    private reduce(state:State, action:State) {
      const newState:State = {};
      Object.keys(this.reducers).forEach((prop:string) => {
        newState[prop] = this.reducers[prop](state[prop], action);
      });
      return newState;
    }
}
