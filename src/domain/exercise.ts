export class Exercise {
    constructor(
        public _id: string,
        public name: string,
        public description: string,
        public reps: number,
        public sets: number,
        public isRepetition: boolean,
        public time?: number
    ) {}
}
