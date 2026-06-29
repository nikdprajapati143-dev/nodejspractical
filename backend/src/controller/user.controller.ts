import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import ApiResponse from "../utils/ApiResponse";
import userService from "../services/user.service";
import taskService from "../services/task.service";

class UserController {

    getUsers = asyncHandler(async (req: Request, res: Response) => {

        const users = await userService.getUsers();

        return res.json(
            new ApiResponse(
                true,
                "Users fetched successfully",
                users
            )
        );

    });

}

export default new UserController();