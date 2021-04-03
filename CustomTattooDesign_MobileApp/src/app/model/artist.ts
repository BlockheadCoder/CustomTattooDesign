export interface Artist {
    id : number;
    username : string;
    sessionToken : string;
    firstName : string;
    lastName : string;
    role : string;
    paypalEmail : string;
    overrideJobLimit : number;
    maxJobValue : number;
    averageTimeToCompletion : number;
    averageTimeToIntroduction : number;
}