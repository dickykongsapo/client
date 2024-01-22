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
import React, { CSSProperties, useCallback, useEffect, useMemo, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { toast, ToastContainer, ToastOptions } from 'react-toastify';

const container: CSSProperties = {
    display: 'flex'
}

const thumbsContainer: CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16
};

const thumb: CSSProperties = {
    display: 'inline-flex',
    borderRadius: 2,
    border: '1px solid #eaeaea',
    marginBottom: 8,
    marginRight: 8,
    width: 100,
    height: 100,
    padding: 4,
    boxSizing: 'border-box'
    // boxSizing: 'border-box'
};

const thumbInner: CSSProperties = {
    display: 'flex',
    minWidth: 0,
    overflow: 'hidden'
};

const img: CSSProperties = {
    display: 'block',
    width: 'auto',
    height: '100%'
};

const baseStyle: CSSProperties = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#eeeeee',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: '#bdbdbd',
    outline: 'none',
    transition: 'border .24s ease-in-out'
};

// const b64toBlob = (b64Data, contentType = '', sliceSize = 512) => {
//     console.log(b64Data.replace(/^data:image\/(png|jpeg|jpg);base64,\/9j\//, ''))
//     const byteCharacters = atob(b64Data);
//     const byteArrays = [];

//     for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
//         const slice = byteCharacters.slice(offset, offset + sliceSize);

//         const byteNumbers = new Array(slice.length);
//         for (let i = 0; i < slice.length; i++) {
//             byteNumbers[i] = slice.charCodeAt(i);
//         }

//         const byteArray = new Uint8Array(byteNumbers);
//         byteArrays.push(byteArray);
//     }

//     const blob = new Blob(byteArrays, { type: contentType });
//     return blob;
// }


const ImageInput = (props) => {
    const { value, setFieldValue, name, instruction, size } = props
    const notify = (message: string) => toast.warn(message);
    const [files, setFiles] = useState([]);
    const [sizeName, setSizeName] = useState('');

    const sizeConverter = (size) => {


        if (size > 1000000) {
            return `${size / 1000000}MB`;
        } else if (size > 1000) {
            return `${size / 1000}KB`;
        }
    }

    const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } = useDropzone({
        accept: {
            'image/*': []
        },
        onDrop: (acceptedFiles, rejectedFiles) => {
            try {
                rejectedFiles.map(file => {
                    if (file.errors[0].code == 'file-too-large') {
                        notify(`Cannot upload file, Maximum upload file size: ${sizeConverter(size)}`)
                    }
                })
                if (rejectedFiles.length == 0) {
                    setFiles([URL.createObjectURL(acceptedFiles[0])]);

                    const reader = new FileReader();
                    reader.onloadend = function () {
                        let base64data = reader.result;
                        setFieldValue(name, base64data)

                    }
                    reader.readAsDataURL(acceptedFiles[0]);

                }

            }
            catch {

            }

        },
        multiple: false,
        maxSize: size
    });

    const style = useMemo(() => ({
        ...baseStyle
    }), [
        isFocused,
        isDragAccept,
        isDragReject
    ]);


    const thumbs = files.map((file, key) => (
        <div style={thumb} key={key}>
            <div style={thumbInner}>
                <img
                    src={file}
                    style={img}
                    // Revoke data uri after image is loaded
                    onLoad={() => { URL.revokeObjectURL(file) }}
                />
            </div>
        </div>
    ));

    const testFunction = useCallback(async () => {

        const base64 = await fetch(value);
        const blob = await base64.blob();
        setFiles([URL.createObjectURL(blob)])

    }, [value])
    useEffect(() => {

        testFunction()
    }, [testFunction])
    useEffect(() => {
        console.log('dee')
        return () => files.forEach(file => URL.revokeObjectURL(file));
    }, []);
    useEffect(() => {
        console.log('sss')
    }, [value])

    return (
        <section className="container" style={container}>
            <div {...getRootProps({ style })}>
                <input {...getInputProps()} />
                <p>{instruction}</p>
            </div>
            {value !== '' ?
                <aside style={thumbsContainer}>
                    {thumbs}
                </aside> : null

            }
        </section>

    );
}

export default ImageInput