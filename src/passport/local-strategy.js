import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import UserDao from "../daos/mongodb/user.dao.js";
const userDao = new UserDao();

const strategyOptions = {
  usernameField: "email",
  passwordField: "password",
  passReqToCallback: true,
};

const register = async (req, email, password, done) => {
  try {
    const user = await userDao.getByEmail(email);
    if (user) return done(null, false);
    const newUser = await userDao.registerUser(req.body);
    return done(null, newUser);
  } catch (error) {
    return done(error, false);
  }
};

const login = async (req, email, password, done) => {
  try {
    const user = { email, password };
    const UserLogin = await userDao.loginUser(user);
    if (!UserLogin) return done(null, false, { message: "Usernot found" });
    return done(null, UserLogin);
  } catch (error) {
    console.log(error);
  }
};

const registerStrategy = new LocalStrategy(strategyOptions, register);
const loginStrategy = new LocalStrategy(strategyOptions, login);

passport.use("login", loginStrategy);
passport.use("register", registerStrategy);

passport.serializeUser((user, done) => {
  done(null, user._id);
});
passport.deserializeUser(async (id, done) => {
  const user = await userDao.getById(id);
  return done(null, user);
});
