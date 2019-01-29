export class Auth{
    user:User;
    hasError:boolean;
    errMsg:string;
    redirectUrl:string;
}
export class User{
    id:number;
    uid:string;
    una:string;
    //ups:string;
    token:string;
    utp:string;
    dpid:string;
    fid:string;
    ref:number;    //过期时间
}