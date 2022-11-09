import {action, computed, makeObservable, observable} from "mobx";
import {makePersistable} from "mobx-persist-store";

class AppStore {
    user = "";
    isLoggedIn = false

    constructor() {
        makeObservable(this, {
            user: observable,
            isLoggedIn: observable,
            User:computed,
            IsLoggedIn: computed,
            setUser:action,
            setIsLoggedIn: action
        });
        makePersistable(this,{
           name:"AppStore",
            properties:["user","isLoggedIn"],
            storage: window.localStorage
        })
    }

    get User(){
        return this.user;
    }
    setUser = (userName) => {
        this.user = userName;
    }

    get IsLoggedIn() {
        return this.isLoggedIn;
    }

    setIsLoggedIn = (isLoggedIn) => {
        this.isLoggedIn = isLoggedIn;
    }

}
export const applicationStore = new AppStore();