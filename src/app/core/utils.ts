

export function isDefinedAndNotNull(value: any): boolean {
    return typeof value !== 'undefined' && value !== null;
}


export function baseUrl(): string {
    let url = window.location.protocol + '//' + window.location.hostname;
    const port = window.location.port;
    if (port && port.length > 0 && port !== '80' && port !== '443') {
        url += ':' + port;
    }
    return url;
}