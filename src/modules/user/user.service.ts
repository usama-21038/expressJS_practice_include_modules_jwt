import { pool } from "../../db";
import type { IUser } from "./user.interface";
import bcrypt from "bcryptjs";

const createUserIntoDB = async (payload: IUser) => {
    const { name, email, password, age } = payload;

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user into database
    const result = await pool.query(
        `
        INSERT INTO users (
            name,
            email,
            password,
            age
        )
        VALUES ($1, $2, $3, $4)
        RETURNING 
            id,
            name,
            email,
            age,
            created_at,
            updated_at;
        `,
        [name, email, hashedPassword, age]
    );

    // Return created user without password
    return result.rows[0];
};



const getAllUsersFromDB=async()=>{
    const result = await pool.query(`
            SELECT * FROM users`);
            return result;
}

const getSingleUserFromDB=async(id: string)=>{
     const result = await pool.query(`
            SELECT * FROM users WHERE id=$1`, [id]);
            return result;
}

const updateUserIntoDB = async(payLoad:IUser, id: string )=>{
    const { name, password, age } = payLoad;
    const result = await pool.query(`
            UPDATE users SET 
            name = COALESCE($1, name),
            password = COALESCE($2, password),
            age = COALESCE($3, age)
            WHERE id = $4
            RETURNING *
        `, [name, password, age, id]);
        return result;
}

const deleteUserFromDB = async(id:string)=>{
     const result = await pool.query(`
            DELETE FROM users 
            WHERE id = $1
        `, [id]);
        return result;
}

export const userService={
    createUserIntoDB,
    getAllUsersFromDB,
    getSingleUserFromDB,
    updateUserIntoDB,
    deleteUserFromDB,
    
}