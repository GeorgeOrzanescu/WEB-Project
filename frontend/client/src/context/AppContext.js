import {createContext} from "react";

const AppContext = createContext({
    user: ""
})

export const AppContextProvider = (props) => (
    <AppContext.Provider value={
        {user:""}
    }>
        {props.children}
    </AppContext.Provider>)

export default AppContext;