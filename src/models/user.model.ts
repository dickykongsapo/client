///
/// Copyright © 2016-2019 The Thingsboard Authors
///
/// Licensed under the Apache License, Version 2.0 (the "License");
/// you may not use this file except in compliance with the License.
/// You may obtain a copy of the License at
///
///     http://www.apache.org/licenses/LICENSE-2.0
///
/// Unless required by applicable law or agreed to in writing, software
/// distributed under the License is distributed on an "AS IS" BASIS,
/// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
/// See the License for the specific language governing permissions and
/// limitations under the License.
///
import { Authority } from "@models/authority.enum";
import { BaseData } from "@models/base-data";
import { CustomerId } from "@models/id/customer-id";
import { TenantId } from "@models/id/tenant-id";
import { UserId } from "@models/id/user-id";

export interface AuthUser {
    sub: string;
    scopes: string[];
    userId: string;
    firstName: string;
    lastName: string;
    enabled: boolean;
    tenantId: string;
    customerId: string;
    isPublic: boolean;
    authority: Authority;
}


export enum ActivationMethod {
    SET_PASSWORD_MANUALLY = 'SET_PASSWORD_MANUALLY',
    DISPLAY_ACTIVATION_LINK = 'DISPLAY_ACTIVATION_LINK',
    SEND_ACTIVATION_MAIL = 'SEND_ACTIVATION_MAIL'
}

export const activationMethodTranslations = new Map<ActivationMethod, string>(
    [
        [ActivationMethod.SET_PASSWORD_MANUALLY, 'user.set-password-manually'],
        [ActivationMethod.DISPLAY_ACTIVATION_LINK, 'user.display-activation-link'],
        [ActivationMethod.SEND_ACTIVATION_MAIL, 'user.send-activation-mail']
    ]
);
export interface User extends BaseData<UserId> {
    tenantId: TenantId;
    customerId: CustomerId;
    email: string;
    authority: Authority;
    firstName: string;
    lastName: string;
    additionalInfo: any;
}
