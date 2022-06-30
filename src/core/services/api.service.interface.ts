import { RequestOptionsArgs, Response } from '@angular/http';

/**
 * Service responsable to make HTTP requests to all Kiosk plugins
 */
export abstract class IApiService {
    /**
     * Return the enpoint for the given service
     *
     * @param service Service endpoint
     */
    abstract getEndpoint(service: string): string;

    /**
     * Generate the target url for the given api and service
     *
     * @param api API name to be called
     * @param service Service endpoint. If no value provided, the default Kiosk endpoint should be used
     */
    abstract generateUrl(api: string, service?: string): string;

    /**
     * Performs a request with `get` http method.
     *
     * @param api API name to be called
     * @param service Service endpoint. If no value provided, the default Kiosk endpoint should be used
     * @param options Request options
     */
    abstract get<T>(
        api: string,
        service?: string,
        options?: RequestOptionsArgs
    ): Promise<T>;

    /**
     * Performs a request with `post` http method.
     *
     * @param api API name to be called
     * @param body Request body
     * @param service Service endpoint. If no value provided, the default Kiosk endpoint should be used
     * @param options Request options
     */
    abstract post<T>(
        api: string,
        body: any,
        service?: string,
        options?: RequestOptionsArgs
    ): Promise<T>;

    /**
     * Performs a request with `put` http method.
     *
     * @param api API name to be called
     * @param body Request body
     * @param service Service endpoint. If no value provided, the default Kiosk endpoint should be used
     * @param options Request options
     */
    abstract put<T>(
        api: string,
        body: any,
        service?: string,
        options?: RequestOptionsArgs
    ): Promise<T>;

    /**
     * Performs a request with `delete` http method.
     *
     * @param api API name to be called
     * @param service Service endpoint. If no value provided, the default Kiosk endpoint should be used
     * @param options Request options
     */
    abstract delete<T>(
        api: string,
        service?: string,
        options?: RequestOptionsArgs
    ): Promise<T>;

    /**
     * Performs a request with `head` http method to check if the resource exists
     *
     * @param url Resource's URL to be checked
     * @param options Request options
     * @returns a promisse to a HTTP Response ("ok"/200 if image exists/is accessible, anything else otherwise).
     */
    abstract checkResource(
        url: string,
        options?: RequestOptionsArgs
    ): Promise<Response>;
}
