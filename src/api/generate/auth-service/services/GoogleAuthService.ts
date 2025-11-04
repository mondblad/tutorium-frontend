/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class GoogleAuthService {
    /**
     * @returns string OK
     * @throws ApiError
     */
    public static getGoogleAuthLink(): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/GoogleAuth/link',
        });
    }
    /**
     * @param code
     * @returns any OK
     * @throws ApiError
     */
    public static getGoogleAuthCallback(
        code?: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/GoogleAuth/callback',
            query: {
                'code': code,
            },
        });
    }
}
