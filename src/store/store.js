import { applyMiddleware, configureStore } from "@reduxjs/toolkit";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { rootReducer } from "../app/core/core.state";
import listenerMiddleware from "../app/core/settings/settings.effects";
import createSagaMiddleware from 'redux-saga'
import settingEffect from "../app/core/settings/settings.effects";

const sagaMiddleware = createSagaMiddleware()
const middleware = [thunk, sagaMiddleware];

const store = configureStore(
    {
        reducer: rootReducer,
        // middleware: middleware
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(middleware),
        // middleware: (getDefaultMiddleware) =>
        //     getDefaultMiddleware().prepend(listenerMiddleware.middleware)
    },
    // applyMiddleware(...middleware)
);

sagaMiddleware.run(settingEffect)

// const store = createStore(
//     {
//         reducer
//     },
//     composeWithDevTools(applyMiddleware(...middleware))
// );
export default store;