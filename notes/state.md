# useState

```typescript
import { useState } from "react";

const NewComponent: FC<{}> = (props) => {
  const [name, setName] = useState(value); // Value can be Object, arrays, any data type etc.
};

export default NewComponent;
```

# useReducer

- Always place nameReducer outside of component

```typescript
import { useReducer } from "react";

const nameReducer = (prevState, action) => {
  switch (action.type) {
    case "ACTION_1":
      return { ...prevState, value: action.payload }; // DO some logic here for this action types. payload is data after dispatching
    default:
      return prevState;
  }
};

const defaultNameState = {
  value: null,
};

const NewComponent: FC<{}> = (props) => {
  const [nameState, dispatchName] = useReducer(nameReducer, defaultState); // Value can be Object, arrays, any data type etc.

  const doSomethingWithReducer = () => {
    dispatchName({ type: "ACTION_1", payload: data });
  };
};

export default NewComponent;
```

# Context API

1. Create Context (in store/Context/name-context.ts)

```typescript
import { createContext } from "react";

const defaultContextState = {
  isLoggedIn: null,
};

const nameContext = createContext(isLoggedIn); // ANy data type can be pass

export default nameContext;
```

2. Create Provider File (store/Context/NAmeContextProvider.tsx)

```typescript
import nameContext from "./name-context";

const defaultContextState = {
  isLoggedIn: null,
};

const NameContextProvider: FC<{}> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleToggleLoginState = () => {
    setIsLoggedIn((prevState) => !prevState);
  };

  // Define value object for provider
  const nameContextProviderValue = { isLoggedIn, handleToggleLoginState };
  return (
    <nameContext.Provider value={nameContextProviderValue}>
      {children}
    </nameContext.Provider>
  );
};

export default NameContextProvider;
```

3. Wrap NameContextProvider around children component / in index.tsx

```typescript
import ReactDOM from 'react-dom'
import App from './App'
import NameContextProvider from './Store/Contexts/NameContextProvider'

ReactDOM.render(
    <NameContextProvider>
      <App />
    </NameContextProvider>
  document.getElementById('root')
)

```

4. use with useContext hook where data is needed

```typescript
import { useContext } from "react";
import nameContext from "./Store/Context/name-context";

const App: FC<{}> = (props) => {
  const ctxData = useContext(nameContext); // ctxData is of same type that passed inside created nameContext. So destructuring is possible on Array or Object. Example: const [val1, val2] = useContext(arrayNameContext)

  return <>{ctxData.isLoggedIn ? <Dashboard /> : <Login />}</>;
};
```

# Redux (with react-redux)

1. Create central redux store with method.types

```typescript
import { createStore, Reducer } from "redux";

export interface IDefaultState {
  isLoggedIn: boolean;
}

type IActionTypes = "signin" | "signout";

export interface IAction {
  type: IActionTypes;
  payload: unknown;
}

const defaultState: IDefaultState = {
  isLoggedIn: false,
};

//
const nameReducer: Reducer<IDefaultState, IAction> = (
  state = defaultState,
  action
) => {
  switch (action.type) {
    // SIGNIN
    case "signin":
      return { ...state, isLoggedIn: true };
    // SIGNOUT
    case "signout":
      return { ...state, isLoggedIn: false };
    default:
      return state;
  }
};

const store = createStore(nameReducer);

export type IStoreDispatch = typeof store.dispatch;

export default store;
```

2. Wrap store provider around child components

```typescript
import { Provider } from "react-redux";
import store from "./Store/Redux/store";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("app")
);
```

3. Read & subscribe state value

```typescript
import { useSelector } from "react-redux";

const App: FC = (props) => {
  const selector = useSelector((state) => state); // selector is state sent by useSelector function

  return (
    <>{selector.isLoggedIn ? <div>Logged In</div> : <div>Logged Out</div>}</>
  );
};
```

4. Dispatch actions

```typescript
import { useDispatch } from "react-redux";

const App: FC = (props) => {
  const dispatch = useDispatch();

  const handleLogin = () => {
    // type = defined earlier in store
    // payload = data to send to action
    dispatch({ type: "login", payload: null });
  };

  return <button onClick={handleLogin}>login</button>;
};
```
