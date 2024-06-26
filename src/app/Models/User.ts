export class User {

    userLikes: string[]

    constructor(
        public name: string,
        public email: string,
        public id: string,
        private _token: string,
        private _expiresIn: Date,
    ) {

        this.userLikes = []
    }

    get token() {
        if (!this._expiresIn || this._expiresIn < new Date()) {
            return null;
        }
        return this._token;
    }
}