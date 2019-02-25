import { ExtractJwt, Strategy } from "passport-jwt";
import passport from "koa-passport";
import { User } from "./resources/user/user.model";

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken("jwt"),
  secretOrKey: process.env.JWT_SECRET
};

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findOne({ id });
    done(null, user);
  } catch (e) {
    done(e);
  }
});

passport.use(
  new Strategy(options, async function(payload, done) {
    const user = await User.findById(payload.id);

    if (!user) {
      done(null, false);
    }

    done(null, user);
  })
);
