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

import { baseUrl, guid, isString } from "@app/core/utils";
import { customTranslationsPrefix, EntityType, i18nPrefix } from "@app/shared/public-api";
import { materialColors } from "@models/material.models";
// import { WidgetAction } from "@models/widget-component.model";
import { Datasource, DatasourceType, WidgetInfo } from "@models/widget.models";
import i18n from 'src/i18n';
const i18nRegExp = new RegExp(`{${i18nPrefix}:[^{}]+}`, 'g');

export class UtilsService {
    iframeMode = false;
    widgetEditMode = false;
    // editWidgetInfo: WidgetAction = null;

    constructor(private window: Window) {

    }
    public getQueryParam = (name: string): string | any => {
        const url = this.window.location.href;
        name = name.replace(/[\[\]]/g, '\\$&');
        const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
        const results = regex.exec(url);
        if (!results) {
            return null;
        }
        if (!results[2]) {
            return '';
        }
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }

    public updateQueryParam = (name: string, value: string | null) => {
        const baseUrlPart = [baseUrl(), this.window.location.pathname].join('');
        const urlQueryString = this.window.location.search;
        let newParam = '';
        let params = '';
        if (value !== null) {
            newParam = name + '=' + value;
        }
        if (urlQueryString) {
            const keyRegex = new RegExp('([\?&])' + name + '[^&]*');
            if (urlQueryString.match(keyRegex) !== null) {
                if (newParam) {
                    newParam = '$1' + newParam;
                }
                params = urlQueryString.replace(keyRegex, newParam);
            } else if (newParam) {
                params = urlQueryString + '&' + newParam;
            }
        } else if (newParam) {
            params = '?' + newParam;
        }
        this.window.history.replaceState({}, '', baseUrlPart + params);
    }


    public customTranslation(translationValue: string, defaultValue: string): string {
        if (translationValue && isString(translationValue)) {
            if (translationValue.includes(`{${i18nPrefix}`)) {
                const matches = translationValue.match(i18nRegExp);
                let result = translationValue;
                for (const match of matches) {
                    const translationId = match.substring(6, match.length - 1);
                    result = result.replace(match, this.doTranslate(translationId, match));
                }
                return result;
            } else {
                return this.doTranslate(translationValue, defaultValue, customTranslationsPrefix);
            }
        } else {
            return translationValue;
        }
    }

    private doTranslate(translationValue: string, defaultValue: string, prefix?: string): string {
        let result: string;
        let translationId;
        if (prefix) {
            translationId = prefix + translationValue;
        } else {
            translationId = translationValue;
        }


        const translation = i18n.t(translationId);
        if (translation !== translationId) {
            result = translation + '';
        } else {
            result = defaultValue;
        }
        return result;
    }


    public guid(): string {
        return guid();
    }

    public currentPerfTime(): number {
        return this.window.performance && this.window.performance.now ?
            this.window.performance.now() : Date.now();
    }

    public validateDatasources(datasources: Array<Datasource>): Array<Datasource> {
        datasources.forEach((datasource) => {
            // @ts-ignore
            if (datasource.type === 'device') {
                datasource.type = DatasourceType.entity;
                datasource.entityType = EntityType.DEVICE;
                if (datasource.deviceId) {
                    datasource.entityId = datasource.deviceId;
                } else if (datasource.deviceAliasId) {
                    datasource.entityAliasId = datasource.deviceAliasId;
                }
                if (datasource.deviceName) {
                    datasource.entityName = datasource.deviceName;
                }
            }
            if (datasource.type === DatasourceType.entity && datasource.entityId) {
                datasource.name = datasource.entityName;
            }
            if (!datasource.dataKeys) {
                datasource.dataKeys = [];
            }
        });
        return datasources;
    }


    public getMaterialColor(index: number) {
        const colorIndex = index % materialColors.length;
        return materialColors[colorIndex].value;
    }
}

