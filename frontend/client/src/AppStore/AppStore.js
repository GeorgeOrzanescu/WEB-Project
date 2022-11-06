import {action, computed, makeObservable, observable} from "mobx";
import {makePersistable} from "mobx-persist-store";

class AppStore {
    user = "";

    constructor() {
        makeObservable(this, {
            user: observable,
            User:computed,
            setUser:action
        });
        makePersistable(this,{
           name:"AppStore",
            properties:["user"],
            storage: window.localStorage
        })
    }

    get User(){
        return this.user;
    }
    setUser = (userName) => {
        this.user = userName;
    }
}
export const applicationStore = new AppStore();