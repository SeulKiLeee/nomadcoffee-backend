import { protectedResolver } from "../users.utils";
import client from "../../client";

export default {
    Mutation: {
        followUser: protectedResolver(async(_, {username}, {loggedInuser}) => {
            const ok = await client.user.findUnique({ where: { username }});
            if(!ok){
                return {
                    ok: false,
                    error: "That user does not exist.",
                }
            }
            await client.user.update({
                where: {
                    id: loggedInuser.id,
                },
                data: {
                    following: {
                        connect: {
                            username,
                        }
                    }
                }
            });
            return {
                ok: true,
            }
            }
        ),
    },
};