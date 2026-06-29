import User from "../models/User.model";
import UserRole from "../enums/role.enum";

class UserService {

    async getUsers() {

        const users = await User.find({
            role: UserRole.USER,
        })
            .select("_id name email role")
            .sort({ name: 1 });

        return users.map(user => ({
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
        }));
    }

}

export default new UserService();