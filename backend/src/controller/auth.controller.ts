import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import ApiResponse from "../utils/ApiResponse";
import authService from "../services/auth.service";
import { transformLogin } from "../transformers/auth.transformer";

class AuthController {
    login = asyncHandler(async (req: Request, res: Response) => {
        const { email, password } = req.body;

        const data = await authService.login(email, password);

        return res.status(200).json(
            new ApiResponse(
                true,
                "Login successful",
                transformLogin(data.user, data.token)
            )
        )
    });



    logout = asyncHandler(async (req: Request, res: Response) => {

        await authService.logout(req.user.id);

        return res.json(
            new ApiResponse(
                true,
                "Logout successful"
            )
        );

    });


    getProfile = asyncHandler(async (req, res) => {

        const user = await authService.getProfile(
            req.user.id
        );

        return res.json(
            new ApiResponse(
                true,
                "Profile fetched successfully",
                user
            )
        );

    });
}


export default new AuthController();