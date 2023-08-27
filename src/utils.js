import { dirname } from "path";
import { fileURLToPath } from "url";
export const __dirname = dirname(fileURLToPath(import.meta.url));

import { hashSync, compareSync, genSaltSync } from "bcrypt";
import MongoStore from "connect-mongo";
import { connectionString } from "./daos/mongodb/connection.js";

export const mongoStoreOptions = {
  store: MongoStore.create({
    mongoUrl: connectionString,
    crypto: {
      secret: "1234",
    },
  }),
  secret: "1234",
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 60000,
  },
};

/**
 * Método que recibe password sin hashear y retorna pasword hasheada
 * @param {*} password string
 * @returns password hasheada -> string
 * @example
 * createHash("1234")
 */

export const createHash = (password) => hashSync(password, genSaltSync(10));

/**
 * Método que compara password hasheada con password de login
 * @param {*} user
 * @param {*} password  string
 * @returns boolean
 */
export const isValidPassword = (password, user) =>
  compareSync(password, user.password);
