/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { RegistrationAttemptDto } from '../models/RegistrationAttemptDto';
import type { RegistrationAttemptUpdateDto } from '../models/RegistrationAttemptUpdateDto';
import type { testConfirm } from '../models/testConfirm';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class EmailRegistrationService {
    /**
     * @param token
     * @returns RegistrationAttemptDto OK
     * @throws ApiError
     */
    public static getRegistration(
        token: string,
    ): CancelablePromise<RegistrationAttemptDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/registration/{token}',
            path: {
                'token': token,
            },
        });
    }
    /**
     * @param token
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static putRegistration(
        token: string,
        requestBody?: RegistrationAttemptUpdateDto,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/registration/{token}',
            path: {
                'token': token,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns string OK
     * @throws ApiError
     */
    public static postRegistration(): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/registration',
        });
    }
    /**
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static postRegistrationConfirm(
        requestBody?: testConfirm,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/registration/confirm',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
