import prisma from '../../../../prisma/prisma.js';

export class PostgresGetUserByEmailRepositorie {
    async execute(email) {
        const user = await prisma.user.findUnique({
            where: {
                email: email,
            },
        });
        return user;
    }
}
