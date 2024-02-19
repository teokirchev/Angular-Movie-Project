export class User {


    constructor(
        email: string,
        id: string,
        private _token: string,
        private _expiresIn: Date,
    ) { }

    get token() {
        if (!this._expiresIn || this._expiresIn < new Date()) {
            return null;
        }
        return this._token;
    }
}