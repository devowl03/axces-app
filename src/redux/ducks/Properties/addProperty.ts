import axios from 'axios';
import {addPropertyUrl} from '../../../utils/api';
import {BASE_URL} from '../../../constants';

const ADD_PROPERTIES = 'properties/addProperties';

const initialState = {
  called: false,
  data: null,
  status: '',
  message: '',
  code: null,
};

export default function propertiesReducer(state = initialState, action: any) {
  switch (action.type) {
    case ADD_PROPERTIES:
      return {...state, ...action.payload};
    default:
      return state;
  }
}

export function addPropertiesAction(res) {
  return {type: ADD_PROPERTIES, payload: {...res, called: true}};
}

export const onPostProperty =
  (
    id: string | number,
    property_type: any,
    property_name: string,
    aboutProperty: string,
    pincode: any,
    latitude: number,
    longitude: number,
    bedrooms: string,
    bathrooms: string,
    area: string,
    facing: string,
    floor_number: string,
    total_floors: string,
    furnish_type: string,
    start_date: string | any,
    monthly_rent: string,
    security_deposit: string,
    preferred_tenant: string | null,
    landmark: string,
    facilities: string,
    images: any,
  ): any =>
  async (dispatch: any) => {
    const url = `${BASE_URL}${addPropertyUrl(id)}`;

    const loc = {
      latitude,
      longitude,
    };

    const body = new FormData();
    body.append('property_type', property_type);
    body.append('title', property_name);
    body.append('description', aboutProperty);
    body.append('address', property_name);
    body.append('pincode', pincode);
    body.append('location', JSON.stringify(loc));
    body.append('building_name', property_name);
    body.append('bedrooms', bedrooms);
    body.append('bathrooms', bathrooms);
    body.append('area_sqft', area);
    body.append('property_age', '5');
    body.append('facing', facing);
    body.append('floor_number', floor_number);
    body.append('total_floors', total_floors);
    body.append('furnish_type', furnish_type);
    body.append('available_from', start_date);
    body.append('monthly_rent', monthly_rent);
    body.append('security_deposit', security_deposit);
    body.append('preferred_tenant', preferred_tenant);
    body.append('landmark', landmark);
    body.append('facilities', facilities);
    images?.map(item => body.append('images', item));
    body.append('listing_type', 'buy');

    console.log('body', body);

    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: url,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data: body,
    };

    try {
      const res = await axios(config);
      dispatch(addPropertiesAction({...res.data}));
    } catch (err) {
      console.error('Error Details:', err);

      dispatch(
        addPropertiesAction({
          ...err,
          called: true,
        }),
      );
    }
  };
