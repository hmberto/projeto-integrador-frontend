import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Http, RequestOptionsArgs, Response } from '@angular/http';
import { HttpErrorResponse } from "@angular/common/http";
import { Observable } from 'rxjs';

// @inheritdoc
@Injectable()
export class ApiService {
    constructor(
        private http: Http,
        private router: Router
    ) {}

    /**
     * @inheritdoc
     */
    get<T>(
        url: string,
        options?: RequestOptionsArgs
    ): Promise<T> {
        return this.getResponse<T>(this.http.get(url, options));
    }

    /**
     * @inheritdoc
     */
    post<T>(
        url: string,
        body: any,
        options?: RequestOptionsArgs
    ): Promise<T> {
        return this.getResponse<T>(this.http.post(url, body, options));
    }

    /**
     * @inheritdoc
     */
    put<T>(
        url: string,
        body: any,
        options?: RequestOptionsArgs
    ): Promise<T> {
        return this.getResponse<T>(this.http.put(url, body, options));
    }

    /**
     * @inheritdoc
     */
    delete<T>(
        url: string,
        options?: RequestOptionsArgs
    ): Promise<T> {
        return this.getResponse<T>(this.http.delete(url, options));
    }

    private getResponse<T>(request: Observable<Response>): Promise<T> {
        return request.toPromise().then((response: Response) => {
            if (!response.ok) {
                throw response;
            }
            return response.json();
        })
        .catch((error: HttpErrorResponse) => {
            this.redirect(error.status);
        });
    }

    redirect(statusCode) {
        this.router.navigate(['usuario']);
    }
}
