import type { Request, Response } from "express";
import { userService } from "./user.service";

const createUser =async (req: Request, res: Response) => {
    // console.log(req.body);
    // const { name, email, password, age } = req.body;
    try {
        const result = await userService.createUserIntoDB(req.body);
        res.status(201).json({
            success: true,
            massage: "User created successfully",
            data: result.rows[0],

        })
    } catch (error: any) {
        res.status(500).json({
            success: false,
            massage: error.massage,
            error: error,
        })
    }
}

const getAllUsers =async (req: Request, res: Response) => {
    try {
        const result = await userService.getAllUsersFromDB();
        res.status(200).json({
            success: true,
            massage: "Users retrieved successfully",
            data: result.rows,
        })
    } catch (error: any) {
        res.status(500).json({
            success: false,
            massage: error.massage,
            error: error,
        })
    }
}

const getSingleUser = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
       const result = await userService.getSingleUserFromDB(id as string);

        if (result.rows.length === 0) {
            res.status(404).json({
                success: false,
                massage: "User not found",
            })
        }

        res.status(200).json({
            success: true,
            massage: "User retrieved successfully",
            data: result.rows[0],
        })

    } catch (error: any) {
        res.status(500).json({
            success: false,
            massage: error.massage,
            error: error,
        })
    }
}

const updateUser =  async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        
        const result = await userService.updateUserIntoDB(req.body, id as string);
        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "User updated successfully",
            data: result.rows[0],
        });

    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error.message,
            error: error,
        });
    }
}


const deleteUser =async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
       const result = await userService.deleteUserFromDB(id as string);
        if (result.rowCount === 0) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "User deleted successfully",
            data: {},
        });

    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error.message,
            error: error,
        });
    }
}

export const userController ={
    createUser,
    getAllUsers,
    getSingleUser,
    updateUser,
    deleteUser,
}
