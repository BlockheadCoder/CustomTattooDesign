import { DesignImage } from "./designImage";
import { Message } from "./message";

export interface Job {
    jobId : number;
    status : string;
    title : string;
    customerName : string;
    tattooLocation : string;
    tattooType : string;
    tattooStyle : string;
    color : boolean;
    commission : number;
    description : string;
    conversation : Message[];
    designImages : DesignImage[];
}