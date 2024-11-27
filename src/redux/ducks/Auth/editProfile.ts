import { editProfle, profileUrl } from "../../../utils/api";
import { getAccessToken, getUserId, postApi } from "../../../utils";

const EDIT_PROFILE = 'auth/editProfile'

const initialState = {
    called: false,
    data: null,
    status: '',
    message: '',
    token: '',
    code: null
}

export default function (state = initialState, action: any) {
    switch (action.type) {
        case EDIT_PROFILE:
            return { ...state, ...action.payload };
        default:
            return { ...state, called: false };
    }
}

export function editProfileAction(res: any): any {
    return { type: EDIT_PROFILE, payload: { ...res, called: true }};
  }
  

  export const onEditProfile = (name: string, email: string) => async(dispatch: any) => {
      const url = editProfle
      const userId = await getUserId()
  
    const body = { name, email};
    console.log('====================================');
    console.log('Editbody', body);
    console.log('====================================');
  
    postApi(url,body, {})
    .then((res: any) => {
      dispatch(editProfileAction({ ...res.data }));
    })
    .catch(err => {
      if (err) {
        dispatch(
          editProfileAction({
            ...err
          }),
        );
      } 
    });
  };