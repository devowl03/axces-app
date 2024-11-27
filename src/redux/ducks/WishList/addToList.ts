import { postApi } from "../../../utils";
import { addToListUrl } from "../../../utils/api";

const ADD_TO_LIST = 'wishlist/addToList'

const initialState = {
    called: false,
    data: null,
    status: '',
    message: '',
}

export default function (state = initialState, action: any) {
    switch (action.type) {
        case ADD_TO_LIST:
            return { ...state, ...action.payload };
        default:
            return { ...state, called: false };
    }
}

export function addToListAction(res: any): any {
    return { type: ADD_TO_LIST, payload: { ...res, called: true } };
}


export const addToWishList = (propertyId: string,action:string) => (dispatch: any) => {
    const url = addToListUrl
    const body = {propertyId, action: action};
    console.log('====================================');
    console.log('propertyId', body);
    console.log('====================================');
    postApi(url, body)
        .then((res: any) => {
            dispatch(addToListAction({ ...res.data }));
        })
        .catch(err => {
            if (err) {
                dispatch(
                    addToListAction({
                        ...err
                    }),
                );
            }
        });
}