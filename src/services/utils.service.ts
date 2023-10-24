import { baseUrl } from "../app/core/utils";

export class UtilsService {
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
}

