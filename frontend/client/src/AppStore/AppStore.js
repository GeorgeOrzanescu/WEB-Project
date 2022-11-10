import { action, computed, makeObservable, observable } from "mobx";
import { makePersistable } from "mobx-persist-store";

class AppStore {
  user = "";
  userId = "";
  isLoggedIn = false;

  constructor() {
    makeObservable(this, {
      user: observable,
      userId: observable,
      isLoggedIn: observable,
      User: computed,
      UserId: computed,
      IsLoggedIn: computed,
      setUser: action,
      setUserId: action,
      setIsLoggedIn: action,
    });
    makePersistable(this, {
      name: "AppStore",
      properties: ["user", "isLoggedIn", "userId"],
      storage: window.localStorage,
    });
  }

  get User() {
    return this.user;
  }
  setUser = (userName) => {
    this.user = userName;
  };

  get UserId() {
    return this.userId;
  }
  setUserId = (userId) => {
    this.userId = userId;
  };

  get IsLoggedIn() {
    return this.isLoggedIn;
  }

  setIsLoggedIn = (isLoggedIn) => {
    this.isLoggedIn = isLoggedIn;
  };
}
export const applicationStore = new AppStore();
