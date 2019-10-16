const User = require('../../models/User');

module.exports = function authenticate(strategy, email, displayName, done) {
  if (!email) {
    return done(null, false, 'Не указан email');
  }
  (async () => {
    try {
      const user = await User.findOne({email});
      if (user) {
        return done(null, user);
      }
      user = await User.create({
        email, displayName,
      });
      done(null, user);
    } catch (err) {
      done(err);
    }
  })
};
