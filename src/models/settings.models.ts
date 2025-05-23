///
/// Copyright © 2016-2021 The Thingsboard Authors
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

import { isNotEmptyStr } from "@app/core/utils";

export const smtpPortPattern: RegExp = /^([0-9]{1,4}|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]|6553[0-5])$/;

export interface AdminSettings<T> {
    key: string;
    jsonValue: T;
}
export declare type SmtpProtocol = 'smtp' | 'smtps';

export interface MailServerSettings {
    mailFrom: string;
    smtpProtocol: SmtpProtocol;
    smtpHost: string;
    smtpPort: number;
    timeout: number;
    enableTls: boolean;
    username: string;
    password: string;
    enableProxy: boolean;
    proxyHost: string;
    proxyPort: number;
    proxyUser: string;
    proxyPassword: string;
}
export interface GeneralSettings {
    baseUrl: string;
}

export interface UserPasswordPolicy {
    minimumLength: number;
    minimumUppercaseLetters: number;
    minimumLowercaseLetters: number;
    minimumDigits: number;
    minimumSpecialCharacters: number;
    passwordExpirationPeriodDays: number;
}

export interface SecuritySettings {
    passwordPolicy: UserPasswordPolicy;
}
export interface UpdateMessage {
    message: string;
    updateAvailable: boolean;
}

export const phoneNumberPattern = /^\+[1-9]\d{1,14}$/;
export const phoneNumberPatternTwilio = /^\+[1-9]\d{1,14}$|^(MG|PN).*$/;

export enum SmsProviderType {
    ACCESSYOU = 'ACCESSYOU',
    AWS_SNS = 'AWS_SNS',
    TWILIO = 'TWILIO'
}

export enum WhatsappProviderType {
    TWILIO = 'TWILIO'
}
export const smsProviderTypeTranslationMap = new Map<SmsProviderType, string>(
    [
        [SmsProviderType.ACCESSYOU, 'admin.sms-provider-type-accessyou'],
        [SmsProviderType.AWS_SNS, 'admin.sms-provider-type-aws-sns'],
        [SmsProviderType.TWILIO, 'admin.sms-provider-type-twilio']
    ]
);

export const whatsappProviderTypeTranslationMap = new Map<WhatsappProviderType, string>(
    [
        [WhatsappProviderType.TWILIO, 'admin.whatsapp-provider-type-twilio']
    ]
);

export interface AccessyouSmsProviderConfiguration {
    url?: string;
    accountno?: string;
    user?: string;
    pwd?: string;
    from?: string;
}

export interface AwsSnsSmsProviderConfiguration {
    accessKeyId?: string;
    secretAccessKey?: string;
    region?: string;
}

export interface TwilioSmsProviderConfiguration {
    accountSid?: string;
    accountToken?: string;
    numberFrom?: string;
}

export type SmsProviderConfigurations = AccessyouSmsProviderConfiguration & AwsSnsSmsProviderConfiguration & TwilioSmsProviderConfiguration;

export type WhatsappProviderConfigurations = TwilioSmsProviderConfiguration;

export interface SmsProviderConfiguration extends SmsProviderConfigurations {
    type: SmsProviderType;
}

export interface WhatsappProviderConfiguration extends WhatsappProviderConfigurations {
    type: WhatsappProviderType;
}
export function smsProviderConfigurationValidator(required: boolean) {
    return control => {
        const configuration: SmsProviderConfiguration = control.value;
        let errors = null;
        if (required) {
            let valid = false;
            if (configuration && configuration.type) {
                switch (configuration.type) {
                    case SmsProviderType.ACCESSYOU:
                        const accessyouConfiguration: AccessyouSmsProviderConfiguration = configuration;
                        valid = isNotEmptyStr(accessyouConfiguration.url) && isNotEmptyStr(accessyouConfiguration.accountno)
                            && isNotEmptyStr(accessyouConfiguration.user) && isNotEmptyStr(accessyouConfiguration.pwd);
                        break;
                    case SmsProviderType.AWS_SNS:
                        const awsSnsConfiguration: AwsSnsSmsProviderConfiguration = configuration;
                        valid = isNotEmptyStr(awsSnsConfiguration.accessKeyId) && isNotEmptyStr(awsSnsConfiguration.secretAccessKey)
                            && isNotEmptyStr(awsSnsConfiguration.region);
                        break;
                    case SmsProviderType.TWILIO:
                        const twilioConfiguration: TwilioSmsProviderConfiguration = configuration;
                        valid = isNotEmptyStr(twilioConfiguration.numberFrom) && isNotEmptyStr(twilioConfiguration.accountSid)
                            && isNotEmptyStr(twilioConfiguration.accountToken);
                        break;
                }
            }
            if (!valid) {
                errors = {
                    invalid: true
                };
            }
        }
        return errors;
    };
}

export interface TestSmsRequest {
    providerConfiguration: SmsProviderConfiguration;
    numberTo: string;
    message: string;
}

export function createSmsProviderConfiguration(type: SmsProviderType): SmsProviderConfiguration {
    let smsProviderConfiguration: SmsProviderConfiguration;
    if (type) {
        switch (type) {
            case SmsProviderType.ACCESSYOU:
                const accessyouSmsProviderConfiguration: AccessyouSmsProviderConfiguration = {
                    url: '',
                    accountno: '',
                    user: '',
                    pwd: '',
                    from: ''
                };
                smsProviderConfiguration = { ...accessyouSmsProviderConfiguration, type: SmsProviderType.ACCESSYOU };
                break;
            case SmsProviderType.AWS_SNS:
                const awsSnsSmsProviderConfiguration: AwsSnsSmsProviderConfiguration = {
                    accessKeyId: '',
                    secretAccessKey: '',
                    region: 'us-east-1'
                };
                smsProviderConfiguration = { ...awsSnsSmsProviderConfiguration, type: SmsProviderType.AWS_SNS };
                break;
            case SmsProviderType.TWILIO:
                const twilioSmsProviderConfiguration: TwilioSmsProviderConfiguration = {
                    numberFrom: '',
                    accountSid: '',
                    accountToken: ''
                };
                smsProviderConfiguration = { ...twilioSmsProviderConfiguration, type: SmsProviderType.TWILIO };
                break;
        }
    }
    return smsProviderConfiguration;
}
