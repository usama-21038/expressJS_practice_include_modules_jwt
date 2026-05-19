import bcrypt from "bcryptjs";
import { pool } from "../../db";
import jwt from "jsonwebtoken";
import config from "../../config";
import { configDotenv } from "dotenv";

const loginUserIntoDB= async(payload: { email: string; password: string })=>{
    const { email, password } = payload;
//1. check if user exists
//2. compare password
//3. Generate token
   

const userData=await pool.query(`
    SELECT * FROM users WHERE email=$1  
    `,[email]);

    if(userData.rows.length===0){
        throw new Error("User not found");
    }

const user=userData.rows[0];
// console.log(user);
const matchPassword=await bcrypt.compare(password, user.password);
console.log(matchPassword);
if(!matchPassword){
    throw new Error("Invalid password");
}
//Generate token
const jwtPayload={
    id:user.id,
    name:user.name,
    email:user.email,
}
const accessToken=jwt.sign(jwtPayload, config.secret as string,{expiresIn:"1d"});

return {accessToken} ;
};

export const authService={
    loginUserIntoDB,
}