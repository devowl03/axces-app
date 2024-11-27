import { LOCATION_URL } from "../../../constants";
import { getLocationApi } from "../../../utils";
import { LOCATION } from "../../../utils/api";

const GET_LOCATION = 'user/getLocation'

const initialState = {
    called: false,
    data: null,
}

export default function (state = initialState, action: any) {
    switch (action.type) {
        case GET_LOCATION:
            return { ...state, ...action.payload };
        default:
            return { ...state, called: false };
    }
}

export function getLocationAction(res: any): any {
    return { type: GET_LOCATION, payload: { ...res, called: true } };
}


export const onGetLocation = (latitude: number, longitude: number) => async (dispatch: any) => {
    const url = LOCATION_URL + LOCATION(latitude, longitude)
    console.log('====================================');
    console.log('url+++++++++', url);
    console.log('====================================');
    await getLocationApi(url).then((res: any) => {
        dispatch(
            getLocationAction({
                ...res
            }),
        )
    })
        .catch(err => {
            if (err) {
                dispatch(
                    getLocationAction({
                        ...err
                    }),
                );
            }
        });
}

