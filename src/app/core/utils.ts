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


export function isDefinedAndNotNull(value: any): boolean {
    return typeof value !== 'undefined' && value !== null;
}


export function getDescendantProp(obj: any, path: string): any {
    if (obj.hasOwnProperty(path)) {
        return obj[path];
    }
    return path.split('.').reduce((acc, part) => acc && acc[part], obj);
}

export function isObject(value: any): boolean {
    return value !== null && typeof value === 'object';
}

export function baseUrl(): string {
    let url = window.location.protocol + '//' + window.location.hostname;
    const port = window.location.port;
    if (port && port.length > 0 && port !== '80' && port !== '443') {
        url += ':' + port;
    }
    return url;
}
export function deepClone<T>(target: T, ignoreFields?: string[]): T {
    if (target === null) {
        return target;
    }
    if (target instanceof Date) {
        return new Date(target.getTime()) as any;
    }
    if (target instanceof Array) {
        const cp = [] as any[];
        (target as any[]).forEach((v) => { cp.push(v); });
        return cp.map((n: any) => deepClone<any>(n)) as any;
    }
    // if (typeof target === 'object' && target !== {}) {
    if (typeof target === 'object') {

        const cp = { ...(target as { [key: string]: any }) } as { [key: string]: any };
        Object.keys(cp).forEach(k => {
            if (!ignoreFields || ignoreFields.indexOf(k) === -1) {
                cp[k] = deepClone<any>(cp[k]);
            }
        });
        return cp as T;
    }
    return target;
}

export function isUndefined(value: any): boolean {
    return typeof value === 'undefined';
}

export function isUndefinedOrNull(value: any): boolean {
    return typeof value === 'undefined' || value === null;
}

export function isDefined(value: any): boolean {
    return typeof value !== 'undefined';
}

export function isEmptyStr(value: any): boolean {
    return value === '';
}

export function isNotEmptyStr(value: any): boolean {
    return value !== null && typeof value === 'string' && value.trim().length > 0;
}

export function isFunction(value: any): boolean {
    return typeof value === 'function';
}

export function isNumber(value: any): boolean {
    return typeof value === 'number';
}

export function isNumeric(value: any): boolean {
    return (value - parseFloat(value) + 1) >= 0;
}

export function isString(value: any): boolean {
    return typeof value === 'string';
}

export function isEmpty(obj: any): boolean {
    for (const key of Object.keys(obj)) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            return false;
        }
    }
    return true;
}