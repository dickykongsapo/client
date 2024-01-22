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


import { Observable } from "rxjs";

export declare type ListRange = {
    start: number;
    end: number;
}
export interface CollectionViewer {
    viewChange: Observable<ListRange>;
}


export declare abstract class DataSource<T> {
    abstract connect(collectionViewer: CollectionViewer): Observable<T[] | ReadonlyArray<T>>

    abstract disconnect(collectionViewer: CollectionViewer): void;
}

export declare function isDataSource(value: any): value is DataSource<any>

export declare class SelectionModel<T> {
    private _multiple;
    private _emitChanges;
    /** Currently-selected values. */
    private _selection;
    /** Keeps track of the deselected options that haven't been emitted by the change event. */
    private _deselectedToEmit;
    /** Keeps track of the selected options that haven't been emitted by the change event. */
    private _selectedToEmit;
    /** Cache for the array value of the selected items. */
    private _selected;
    /** Selected values. */
    get selected(): T[];
    /** Event emitted when the value has changed. */
    changed: Subject<SelectionChange<T>>;
    constructor(_multiple?: boolean, initiallySelectedValues?: T[], _emitChanges?: boolean);
    /**
     * Selects a value or an array of values.
     */
    select(...values: T[]): void;
    /**
     * Deselects a value or an array of values.
     */
    deselect(...values: T[]): void;
    /**
     * Toggles a value between selected and deselected.
     */
    toggle(value: T): void;
    /**
     * Clears all of the selected values.
     */
    clear(): void;
    /**
     * Determines whether a value is selected.
     */
    isSelected(value: T): boolean;
    /**
     * Determines whether the model does not have a value.
     */
    isEmpty(): boolean;
    /**
     * Determines whether the model has a value.
     */
    hasValue(): boolean;
    /**
     * Sorts the selected values based on a predicate function.
     */
    sort(predicate?: (a: T, b: T) => number): void;
    /**
     * Gets whether multiple values can be selected.
     */
    isMultipleSelection(): boolean;
    /** Emits a change event and clears the records of selected and deselected values. */
    private _emitChangeEvent;
    /** Selects a value. */
    private _markSelected;
    /** Deselects a value. */
    private _unmarkSelected;
    /** Clears out the selected values. */
    private _unmarkAll;
    /**
     * Verifies the value assignment and throws an error if the specified value array is
     * including multiple values while the selection model is not supporting multiple values.
     */
    private _verifyValueAssignment;
}