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


import { call, put, select, takeEvery, takeLatest } from 'redux-saga/effects'
import { ThemeService } from '@app/core/services/theme.service';
import { WhiteLabelActionTypes } from '../white-label/white-label.actions';
import { selectWhiteLabel } from '../white-label/white-label.selector';
import { IconService } from '@app/core/services/icon.service';
import { SettingsActionTypes } from './settings.actions';
import { selectColorMode, selectUserLang } from './settings.selectors';
import i18n from 'src/i18n';
import { lang } from 'moment';
import { WhiteLabel } from '@models/white-label.model';

// Worker saga will be fired on USER_FETCH_REQUESTED actions
function* setTheme(action) {
    const whiteLabel: WhiteLabel = yield select(selectWhiteLabel)
    console.log(whiteLabel)
    const themeService = new ThemeService();
    const iconService = new IconService();
    if (whiteLabel) {
        // document.title = whiteLabel.title;
        whiteLabel.color ? themeService.changeTheme(whiteLabel.color) : themeService.changeTheme('#2397c5');
        whiteLabel.icon ? iconService.changeIcon(whiteLabel.icon) : iconService.changeIcon('thingsboard.ico')
    }

    //   const user = yield call(Api.fetchUser, action.payload.whiteLable.color);

}

function* setLang(action) {
    const userLang = yield select(selectUserLang)
    console.log("[DEBUG] Lang: Change Language", { lang: userLang });

    if (userLang) {
        i18n.changeLanguage(userLang)
    }

}


function* setColorMode(action) {
    const colorMode = yield select(selectColorMode)
    console.log("[DEBUG] Lang: Change ColorMode", { colorMode: colorMode });

}

function* settingEffect() {
    yield takeEvery(WhiteLabelActionTypes.LOAD_WHITE_LABEL, setTheme);
    yield takeEvery(WhiteLabelActionTypes.CLEAR_WHITE_LABEL, setTheme);
    yield takeEvery(SettingsActionTypes.CHANGE_LANGUAGE, setLang);
}

export default settingEffect

