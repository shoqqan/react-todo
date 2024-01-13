import ReactDOM from 'react-dom/client'
import './index.css'
import {App} from "./App.tsx";
import {Provider} from "react-redux";
import {store} from "./state/store.ts";
import {HashRouter} from "react-router-dom";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <HashRouter>
            <App/>
        </HashRouter>
    </Provider>
)
