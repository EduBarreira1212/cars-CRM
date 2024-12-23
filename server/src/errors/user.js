export class EmailAlreadyInUse extends Error {
    constructor(email) {
        super(`The e-mail ${email} is already in use.`);
        this.name = 'EmailAlreadyInUseError';
    }
}

export class UserNotFound extends Error {
    constructor(userId) {
        super(`The user with id ${userId} was not found`);
        this.name = 'UserNotFound';
    }
}
