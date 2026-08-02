const passport = require("passport");
const GitHubStrategy = require("passport-github2").Strategy;
const { ObjectId } = require("mongodb");

const connectDB = require("../database/connect");


passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL
    },

    async (accessToken, refreshToken, profile, done) => {

      try {

        const db = await connectDB();

        const users = db.collection("users");


        let user = await users.findOne({
          githubId: profile.id
        });


        if (!user) {

          const newUser = {
            githubId: profile.id,
            name: profile.displayName,

            email:
              profile.emails && profile.emails.length
                ? profile.emails[0].value
                : null
          };


          const result = await users.insertOne(newUser);


          user = {
            _id: result.insertedId,
            ...newUser
          };

        }


        return done(null, user);


      } catch(error) {

        return done(error);

      }

    }

  )
);



passport.serializeUser((user, done) => {

  done(null, user._id.toString());

});



passport.deserializeUser(async (id, done) => {

  try {

    const db = await connectDB();


    const user = await db.collection("users").findOne({
      _id: new ObjectId(id)
    });


    done(null, user);


  } catch(error) {

    done(error);

  }

});



module.exports = passport;