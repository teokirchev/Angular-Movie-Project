export class Comment {
    constructor(
        public name: string,
        public comment: string,
        public id?: string,
        public ownerEmail?: string,
        public ownerId?: string
    ) { }
}