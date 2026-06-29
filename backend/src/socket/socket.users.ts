interface ConnectedUser {

    socketId: string;

    userId: string;

    role: string;

}

const connectedUsers = new Map<string, ConnectedUser>();

export const addUser = (

    socketId: string,

    userId: string,

    role: string

) => {

    connectedUsers.set(socketId, {

        socketId,

        userId,

        role,

    });

};

export const removeUser = (

    socketId: string

) => {

    connectedUsers.delete(socketId);

};

export const getConnectedUsers = () => {

    return Array.from(

        connectedUsers.values()

    );

};

export const getAdmins = () => {

    return getConnectedUsers().filter(

        (user) => user.role === "admin"

    );

};