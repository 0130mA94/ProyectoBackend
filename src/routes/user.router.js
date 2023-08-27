import { Router } from "express";
import { loginUser, registerUser } from "../controllers/user.controllers.js";
import passport from "passport";
import { isAuth } from "./../middlewares/isAuth.js";

const router = Router();

router.post("/register", passport.authenticate("register"), registerUser);

router.post("/login", passport.authenticate("login"), loginUser);

router.get("/private", isAuth, (req, res) => res.send("route private"));

router.get(
  "/register-github",
  passport.authenticate("github", { scope: ["user:email"] })
);

router.get(
  "profile-github",
  passport.authenticate("github", { scope: ["user:email"] }),
  (req, res) => res.send("profile github")
);

export default router;
