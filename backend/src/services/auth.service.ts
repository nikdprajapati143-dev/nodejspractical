import User from "../models/User.model";
import ApiError from "../utils/ApiError";
import { generateToken } from "../utils/jwt";

class AuthService {
    async login(email: string, password: string) {
        const user = await User.findOne({
            email,
        }).select("+password");

        console.log('user', user);
        if (!user) {
            throw new ApiError(404, "User Not Found");
        }

        const isPasswordMatched = await user.comparePassword(password);
        console.log('isPasswordMatched', isPasswordMatched);
        if (!isPasswordMatched) {
            throw new ApiError(401, "Invalid email or password");
        }

        const token = generateToken({
            id: user._id.toString(),
            role: user.role,
        });

        user.token = token;
        await user.save();

        return {
            token,
            user,
        };
    }

    async logout(userId: string) {
        const user = await User.findById(userId).select("+token");

        if (!user) {
            throw new ApiError(404, "User not found");
        }

        user.token = null;

        await user.save();

        return true;
    }

    async getProfile(userId: string) {

        const user = await User.findById(userId);

        if (!user) {
            throw new ApiError(
                404,
                "User not found"
            );
        }

        return user;
    }
}

export default new AuthService();