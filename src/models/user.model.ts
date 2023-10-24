import { Authority } from "./authority.enum";
import { BaseData } from "./base-data";
import { CustomerId } from "./id/customer-id";
import { TenantId } from "./id/tenant-id";
import { UserId } from "./id/user-id";

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
