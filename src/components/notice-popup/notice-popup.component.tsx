/*
 * Copyright © 2016-2021 The Thingsboard Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@mui/material';
import TextField from '@mui/material';
import './notice-popup.styles.scss';
import { NoticeMessage } from '../../models/notice-message.models';


const NoticePopup = (props: { searchString: string }
    // props: {
    //  searchString: any; handleSearchClose: React.MouseEventHandler<HTMLButtonElement> | undefined; handleSearchApply: (arg0: React.MouseEvent<HTMLButtonElement, MouseEvent>, arg1: React.RefObject<HTMLInputElement>) => void;
    //  }
) => {
    const [searchString, setSearchString] = useState(props.searchString);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        // inputRef.current!.value = searchString;
    }, [searchString])

    const searchChange = (e: { target: { value: any; }; }) => {
        setSearchString(e.target.value)
    }

    const searchReset = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        if (inputRef.current) {
            inputRef.current.value = '';
        }
    }

    return (
        <div className='notice-popup'>
            {dummyList.map((list, key) => {
                return <div className='notice-popup-section' key={key}>
                    <li>{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(list.time)}</li>
                    <li>{list.message}</li>
                </div>
            })}
            {/* <div className='search-top-container'>
                <div className='search-slidedown-menu-title'>
                    Search
                </div>
                <Button className='reset-button' onClick={(e) => searchReset(e)}>
                    Reset
                </Button>
            </div>

            <div className='search-device-type-container'>
            </div>

            <div className='search-button-container'>

            </div> */}
        </div>
    )
}


export default NoticePopup;


const dummyList: NoticeMessage[] = [
    {
        message: 'device 1 is damaged',
        time: 1692590377000
    },
    {
        message: 'device 2 is damaged',
        time: 1692590377000
    },
    {
        message: 'device 3 is damaged',
        time: 1692590377000
    },
    {
        message: 'device 4 is damaged',
        time: 1692590377000
    },

]