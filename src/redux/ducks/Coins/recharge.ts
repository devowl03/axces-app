import { recharge } from "../../../utils/api";
import { postApi } from "../../../utils";

const RECHARGE_COINS = 'coins/recharge'

const initialState = {
    called: false,
    data: null,
    status: '',
    message: '',
}

export default function (state = initialState, action: any) {
    switch (action.type) {
        case RECHARGE_COINS:
            return { ...state, ...action.payload };
        default:
            return { ...state, called: false };
    }
}

export function rechargeAction(res: any): any {
    return { type: RECHARGE_COINS, payload: { ...res, called: true }};
  }
  

  // export const onRecharge = (amount: number) => async(dispatch: any) => {
  //     const url = recharge
  
  //   const body = { amount };
  
  //   postApi(url,body, {})
  //   .then((res: any) => {
  //       console.log("RES>>>>>",res.data)
  //     dispatch(rechargeAction({ ...res.data }));
  //   })
  //   .catch(err => {
  //     if (err) {
  //       dispatch(
  //         rechargeAction({
  //           ...err
  //         }),
  //       );
  //     } 
  //   });
  // };


  export const onRecharge = (amount: number) => async (dispatch: any) => {
    const url = recharge;
    const body = {amount};

    return postApi(url, body, {})
      .then((res: any) => {
        console.log('Full Response from API:', res); // Log the full response
        console.log('RES>>>>>', res.data); // Log the `data` field
        dispatch(rechargeAction({...res.data})); // Dispatch success action
        return res; // Return the response for the calling function
      })
      .catch(err => {
        console.error('Recharge error:', err);
        dispatch(rechargeAction({...err}));
        throw err;
      });
  };
