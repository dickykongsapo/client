import { call, put, select, takeEvery, takeLatest } from 'redux-saga/effects'
import { ThemeService } from 'src/services/theme.service';
import { WhiteLabelActionTypes } from '../white-label/white-label.actions';
import { selectWhiteLabel } from '../white-label/white-label.selector';

// Worker saga will be fired on USER_FETCH_REQUESTED actions
function* setTheme(action) {
    const whiteLabel = yield select(selectWhiteLabel)
    const themeService = new ThemeService();
    if (whiteLabel) {
        // document.title = whiteLabel.title;

        whiteLabel.color ? themeService.changeTheme(whiteLabel.color) : themeService.changeTheme('#2397c5');
    }

    //   const user = yield call(Api.fetchUser, action.payload.whiteLable.color);

}

function* settingEffect() {
    yield takeEvery(WhiteLabelActionTypes.LOAD_WHITE_LABEL, setTheme);
    yield takeEvery(WhiteLabelActionTypes.CLEAR_WHITE_LABEL, setTheme);
}

export default settingEffect

