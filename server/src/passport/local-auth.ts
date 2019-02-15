import passport from 'passport'
import LocalStrategy from 'passport-local';
const localStrategy = LocalStrategy.Strategy;
import pool from '../database';
import bcrypt from 'bcrypt-nodejs';



passport.use('local.signin', new localStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
  }, async (req, username, password, done) => {
    const rows = await pool.query(`SELECT * FROM user WHERE user.EMAIL = '${username}' OR user.USER = '${username}'`);
    if (rows.length > 0) {
      const user = rows[0];
      const validPassword = await bcrypt.compareSync(password, user.PASSWORD);
      if (validPassword) {
        console.log(user);
        done(null, user);
      } else {
        done(null, false);
      }
    } else {
      return done(null, false);
    }
  }));

passport.serializeUser((EMAIL, done) => {
    done(null, EMAIL);
  });
  
passport.deserializeUser(async (id, done) => {
    const rows = await pool.query('SELECT * FROM user WHERE EMAIL = ?', [id]);
    done(null, rows[0]);
});

