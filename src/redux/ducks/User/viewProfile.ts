import {getApi} from '../../../utils';
import {getProfile} from '../../../utils/api';

const VIEW_PROFILE = 'user/viewProfile';

const initialState = {
  called: false,
  data: null,
  message: '',
  code: null,
};

export default function (state = initialState, action: any) {
  switch (action.type) {
    case VIEW_PROFILE:
      return {...state, ...action.payload};
    default:
      return {...state, called: false};
  }
}

export function viewProfileAction(res: any): any {
  return {type: VIEW_PROFILE, payload: {...res, called: true}};
}

export const onGetUserProfile = () => (dispatch: any) => {
  const url = getProfile;
  getApi(url)
    .then((res: any) => {
      dispatch(
        viewProfileAction({
          ...res,
        }),
      );
    })
    .catch(err => {
      if (err) {
        dispatch(
          viewProfileAction({
            ...err,
          }),
        );
      }
    });
};
