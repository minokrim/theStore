import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import bcrypt from "bcrypt";
import passport from "passport";
import { Strategy } from "passport-local";
import GoogleStrategy from "passport-google-oauth2";
import session from "express-session";
import env from "dotenv";

const app=express()
const port=5000
env.config();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json());
app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: true,
      cookie: { maxAge: 1000*60*60*24},
    })
  );

app.use(passport.initialize());
app.use(passport.session());
  

const db=new pg.Client({
    user:process.env.PG_USER,
    host:process.env.PG_HOST,
    database:process.env.PG_DATABASE,
    password:process.env.PG_PASSWORD,
    port:process.env.PG_PORT,
  });

db.connect();

const saltRound=10;

app.get("/",(req,res)=>{

})

app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"],
    })
  );

app.get( '/auth/google/callback',
        passport.authenticate( 'google', {
            // failureRedirect: '/auth/google/failure',
}),(req,res)=>{
    res.redirect("http://localhost:3000")
}
);

app.post("/signin/post/callback",async(req,res)=>{
    const email=req.body.email;
    const password=req.body.password;

    try {
        const checkDb=await db.query("SELECT * FROM signup WHERE email=$1",[email]);
        if(checkDb.rows.length>0){
            console.log("login success")
        }
        else{
        bcrypt.hash(password,saltRound,async(err,hash)=>{
            if(err){
                console.log("unable to hash")
            }
            else{
                const setDb=await db.query("INSERT INTO signup(email,password) VALUES($1,$2)",[email,hash])
                console.log("LOGIN SUCCESS")
            }
        })
        }
    } catch (error) {
        console.log(error)
    }
})

passport.use("google", new GoogleStrategy({
    clientID:process.env.GOOGLE_CLIENT_ID,
    clientSecret:process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:5000/auth/google/callback',
    userProfileURL:"https://www.googleapis.com/oauth2/v3/userinfo"
},
    async (accessToken, refreshToken,profile,cb)=>{
        console.log(profile)
        try{
            const usercheck=await db.query("SELECT * FROM signup WHERE email=$1",[profile.emails[0].value])
            if(usercheck.rows.length>0){
                console.log("sign in")
                cb(null,usercheck.rows[0])
            }
            else{
                const newuser=await db.query("INSERT INTO signup(email,password) VALUES($1,$2)",[profile.emails[0].value,"google"])
                cb(null,newuser.rows[0])
                console.log("SIGN IN")
                console.log(newuser)
            }
        }
        catch(err){
            console.log(err)
        }
    }
))

passport.serializeUser((user,cb)=>{
    cb(null,user)
})

passport.deserializeUser((user,cb)=>{
    cb(null,user)
})

app.listen(port,()=>{
    console.log(`server running on ${port}`)
})