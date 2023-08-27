import { Strategy as GithubStrategy } from "passport-github2";
import passport from "passport";
import UserDao from "../daos/mongodb/user.dao.js";
const userDao = new UserDao();

const strategyOptions = {
  clientID: " Iv1.314d70adee83e5a9",
  clientSecret: "69836317e24fdfd4ac8dcb17c4e9fc5600aa3e6c",
  callbackURL: "http://localhost8080/users/profile-github",
};

const registerOrLogin = async (profile, done) => {
  console.log("PROFILE", profile);
};

passport.use("github", new GithubStrategy(strategyOptions, registerOrLogin));
