import { pool } from "../../db";

const createProfileIntoDB= async(payload:any)=>{
// console.log(payload);
const {user_id,bio,address,phone,gender}=payload;
//first check if the user already has a profile
const user=await pool.query(`
  SELECT * FROM profiles WHERE user_id=$1  
    `,[user_id]);
    // console.log(user.rows);
    if(user.rows.length===0){
        throw new Error("User not found");
    }

    const result=await pool.query(`
       INSERT INTO profiles (user_id, bio, address,phone, gender) VALUES ($1, $2, $3, $4, $5) RETURNING *
        `,[user_id,bio,address,phone,gender]);
        return result;

}

export const profileService={

    createProfileIntoDB,
}