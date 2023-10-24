import { EntityId } from './id/entity-id';
import { HasUUID } from './id/has-uuid';

export declare type HasId = EntityId | HasUUID;

export interface BaseData<T extends HasId> {
    createdTime?: number;
    id?: T;
    name?: string;
    label?: string;
}
