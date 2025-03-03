import {postApi} from '../../../utils';
import {propertiesList} from '../../../utils/api';

const GET_PROPERTIES = 'properties/getProperties';

const initialState = {
  called: false,
  data: null,
  status: '',
  message: '',
};

export default function (state = initialState, action: any) {
  switch (action.type) {
    case GET_PROPERTIES:
      return {...state, ...action.payload};
    default:
      return {...state, called: false};
  }
}

export function getPropertiesAction(res: any): any {
  return {type: GET_PROPERTIES, payload: {...res, called: true}};
}

export const getPropertiesList =
  (
    token: string,
    latitude: number,
    longitude: number,
    pincode: string,
    // addlocality: string,
    listing_type: string,
    property_type: string,
    propertyType: string,
    listedFor: string,
    bedrooms: string,
    price: string,
    area: string,
    furnish_type: string,
    preferred_tenant: string,
  ) =>
  (dispatch: any) => {
    console.log('token', token);
    // console.log('lookingFor', listing_type);

    const url = propertiesList;
    const body = {
      userLatitude: latitude,
      userLongitude: longitude,
      filters: {
        pincode: pincode,
        // addlocality: addlocality,
        listing_type: listing_type,
        property_type: property_type,
        propertyType: propertyType,
        listedFor: listedFor,
        bedrooms: bedrooms,
        price: price,
        area: area,
        furnish_type: furnish_type,
        preferred_tenant: preferred_tenant,
      },
    };
    console.log('Request Body:', body);
    const headers = {
      Authorization: `Bearer ${token}`, // Pass token in Authorization header
    };

    postApi(url, body, headers)
      .then((res: any) => {
        console.log('Property List ', res.data);

        dispatch(getPropertiesAction({...res.data}));
      })
      .catch(err => {
        if (err) {
          dispatch(
            getPropertiesAction({
              ...err,
            }),
          );
        }
      });
  };
