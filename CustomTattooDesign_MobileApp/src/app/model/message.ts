export interface Message {
    id : number;
    design_id : number;
    body : string;
    created_at : Date;
    designer_id : number;
    comment_picture : string;
    read : boolean;
}