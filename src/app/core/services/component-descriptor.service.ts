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

import { ComponentDescriptor, ComponentType } from '@models/component-descriptor.models';
import { from, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { RuleNodeType } from '@models/rule-node.models';
import { axiosInstance } from '../interceptor/global-http-interceptor';

export class ComponentDescriptorService {

    private componentsByType: Map<ComponentType | RuleNodeType, Array<ComponentDescriptor>> =
        new Map<ComponentType, Array<ComponentDescriptor>>();
    private componentsByClazz: Map<string, ComponentDescriptor> = new Map<string, ComponentDescriptor>();

    public getComponentDescriptorsByType(componentType: ComponentType): Observable<Array<ComponentDescriptor>> {
        const existing = this.componentsByType.get(componentType);
        if (existing) {
            return of(existing);
        } else {
            return from(axiosInstance.get<Array<ComponentDescriptor>>(`/api/components/${componentType}`))
                .pipe(
                    map(axiosResponse => { return axiosResponse.data }),
                    map((componentDescriptors) => {
                        this.componentsByType.set(componentType, componentDescriptors);
                        componentDescriptors.forEach((componentDescriptor) => {
                            this.componentsByClazz.set(componentDescriptor.clazz, componentDescriptor);
                        });
                        return componentDescriptors;
                    })
                );
        }
    }

    public getComponentDescriptorsByTypes(componentTypes: Array<ComponentType>): Observable<Array<ComponentDescriptor>> {
        let result: ComponentDescriptor[] = [];
        for (let i = componentTypes.length - 1; i >= 0; i--) {
            const componentType = componentTypes[i];
            const componentDescriptors = this.componentsByType.get(componentType);
            if (componentDescriptors) {
                result = result.concat(componentDescriptors);
                componentTypes.splice(i, 1);
            }
        }
        if (!componentTypes.length) {
            return of(result);
        } else {
            return from(axiosInstance.get<Array<ComponentDescriptor>>(`/api/components?componentTypes=${componentTypes.join(',')}`))
                .pipe(
                    map(axiosResponse => { return axiosResponse.data }),
                    map((componentDescriptors) => {
                        componentDescriptors.forEach((componentDescriptor) => {
                            let componentsList = this.componentsByType.get(componentDescriptor.type);
                            if (!componentsList) {
                                componentsList = new Array<ComponentDescriptor>();
                                this.componentsByType.set(componentDescriptor.type, componentsList);
                            }
                            componentsList.push(componentDescriptor);
                            this.componentsByClazz.set(componentDescriptor.clazz, componentDescriptor);
                        });
                        result = result.concat(componentDescriptors);
                        return result;
                    })
                );
        }
    }

    public getComponentDescriptorByClazz(componentDescriptorClazz: string): Observable<ComponentDescriptor> {
        const existing = this.componentsByClazz.get(componentDescriptorClazz);
        if (existing) {
            return of(existing);
        } else {
            return from(axiosInstance.get<ComponentDescriptor>(`/api/component/${componentDescriptorClazz}`))
                .pipe(
                    map(axiosResponse => { return axiosResponse.data }),
                    map((componentDescriptor) => {
                        this.componentsByClazz.set(componentDescriptorClazz, componentDescriptor);
                        return componentDescriptor;
                    })
                );
        }
    }
}
