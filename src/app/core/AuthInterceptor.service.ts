import { Injectable, Inject } from "@angular/core";
import { HttpEvent, HttpHandler, HttpResponse, HttpInterceptor, HttpErrorResponse } from "@angular/common/http";
import { HttpRequest } from "@angular/common/http";
import { Observable,of } from "rxjs";
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(@Inject('auth') private service, private router: Router) { }
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
        const authReq = req.clone({
            headers: req.headers.set('HTTP_MITOKEN', token)   //跨域访问-预请求及跨域问题 XHR OPTIONS
        });
        //const newReq = req.clone({ url });  //目前加在最后做参数   跨域访问-预请求及跨域问题 XHR OPTIONS
        //console.log("new headers", newReq.headers.keys());
        //return next.handle(authReq);
        return next.handle(authReq)
            .pipe(
                catchError((err) => this.handleError(err))
            ) as any;
    }
    private handleError(err: HttpErrorResponse): Observable<any> {
        //console.log(err);
        if (err.status === 401 || err.status === 403) {
            this.service.ClearToken();
            this.router.navigateByUrl(`/login`);
            //return Observable.of(err.message);
            of(err.message);
        }
        // handle your auth error or rethrow
        //return Observable.throw(err);
        return of(err);
    }
}