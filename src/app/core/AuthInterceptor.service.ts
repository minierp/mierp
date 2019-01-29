import { Injectable, Inject } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor } from "@angular/common/http";
import { HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor() { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let userstr = localStorage.getItem('user');
        let token = '';
        //console.log(userstr);
        // return "";
        if (String(userstr) !== "null") {
            let userobj = JSON.parse(userstr);
            token = userobj.token;
        }
        //let url = req.url;
        //console.log(req);
        //if (token) {
        //    url = req.url + '&TOKEN=' + token;
        //}
        const newReq = req.clone({
            headers: req.headers.set('HTTP_MITOKEN', token)   //跨域访问-预请求及跨域问题 XHR OPTIONS
          });
        //const newReq = req.clone({ url });  //目前加在最后做参数   跨域访问-预请求及跨域问题 XHR OPTIONS
        //console.log("new headers", newReq.headers.keys());
        return next.handle(newReq);
    }
}