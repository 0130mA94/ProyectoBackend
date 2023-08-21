import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";

const strategyOptions = {
  usernameField: "email",
  passwordField: "password",
  passReqToCallback: true,
};

const register = async (req, email, password, done) => {
  try {
  } catch (error) {}
};

const login = async (req, email, password, done) => {
  try {
  } catch (error) {}
};

passport.serializeUser(user);
passport.deserializeUser(id);
