import { Router } from "express";
import { userController } from "./user.controller";
import auth from "../../middleware/auth";

const router= Router();



// Create a new user using POST method
router.post('/', userController.createUser);

// Get all users using GET method
router.get('/',auth(), userController.getAllUsers);

// Get a user by id using GET method
router.get('/:id',userController.getSingleUser);

// Update a user by id using PUT method
router.put('/:id',userController.updateUser);

// Delete a user by id using DELETE method
router.delete('/:id', userController.deleteUser);

export const userRoute=router;