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
import { Button } from '@mui/material';


const ThemedButton = (props: { word: string, type?: 'button' | 'submit' | 'reset', onClick?: () => void }
    // props: {
    //  searchString: any; handleSearchClose: React.MouseEventHandler<HTMLButtonElement> | undefined; handleSearchApply: (arg0: React.MouseEvent<HTMLButtonElement, MouseEvent>, arg1: React.RefObject<HTMLInputElement>) => void;
    //  }
) => {

    const { word, type, onClick } = props

    const className = `mui-button ${type == 'reset'}`
    return (
        type == 'reset' ?
            <Button className='mui-button reset' type={type} onClick={onClick}>{word}</Button>

            :
            <Button className='mui-button' type={type} onClick={onClick}>{word}</Button>
    )
}


export default ThemedButton;
