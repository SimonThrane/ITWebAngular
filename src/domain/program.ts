import { Exercise } from './exercise';

export class Program {
    constructor(
        public _id: string,
        public exercises: Exercise[], 
        public name: string,
        public creater: string,
        public create_date: Date
    ) {}
}