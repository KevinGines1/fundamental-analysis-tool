import RatioClassication from "../enums/RatioClassification";

export default interface Ratio {
    name: string;
    classification: RatioClassication;
    formula: (op1: number, op2: number) => number;
    guide: string; 
}