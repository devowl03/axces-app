import axios from "axios";
import { ACCESS_TOKEN, BASE_URL, LOCATION_URL, USER_ID } from "../constants";
import { showMessage } from "react-native-flash-message";
import SInfo from 'react-native-sensitive-info';

export async function getHeaders() {
  const userData = await getAccessToken();
  if (userData) {
    return {
      Authorization: `Bearer ${userData}`,
    };
  }
}

// API Collection 
export async function apiReq(
  endPoint: string,
  data: any,
  method: string,
  headers: any,
) {
  return new Promise(async (res, rej) => {
    const token = await getHeaders()

    headers = {
      ...token,
      ...headers,
    };

    const axiosObj: any = {
      method,
      url: endPoint,
      headers
    };

    if ((axiosObj.headers['Content-Type'] = 'application/json')) {
      axiosObj.data = data;
    } else {
      const formData = new FormData();
      for (const key in data) {
        formData.append(key, data[key]);
      }
      axiosObj.data = formData;
    }
    console.log("axios obj>>>>", axiosObj)
    axios(axiosObj)
      .then((result: any) => {
        console.log('API Result :->', result);
        if (result?.data?.status === 'fail') {
          return rej(result?.data);
        }
        return res(result);
      })
      .catch((error: any) => {
        console.log('API error =>', error);

        if (error?.response?.data) {
          if (!error?.response?.data?.message) {
            return rej({
              ...error?.response?.data,
              msg: error?.response?.data?.message || 'Network Error',
            });
          }
          return rej(error?.response?.data);
        } else {
          return rej({ message: 'Network Error', msg: 'Network Error' });
        }
      });
  });
}

export function postApi(endPoint: string, data?: any, headers = {}) {
  return apiReq(BASE_URL + endPoint, data, 'post', headers);
}

export function deleteApi(endPoint: string, data: any, headers = {}) {
  return apiReq(BASE_URL + endPoint, data, 'delete', headers);
}

export function getApi(
  endPoint?: any,
  data?: any,
  headers = {},
) {
  return apiReq(BASE_URL + endPoint, data, 'get', headers);
}

export function getLocationApi(
  endPoint?: any,
  data?: any,
  headers = {},
) {
  return apiReq(
    endPoint,
    data,
    'get',
    (headers = {
      'User-Agent': 'axces/1.0 (axces.customercare@gmail.com)',
      'Content-Type': 'application/json',
    }),
  );
}

export function putApi(endPoint: string, data: any, headers = {}) {
  return apiReq(BASE_URL + endPoint, data, 'put', headers);
}


//Toast Collection

export function successMessage(message: any) {
  showMessage({
    message: message,
    type: 'success',
    statusBarHeight: 50,
    animated: true,
    duration: 2000,
    icon: 'success',
    position: 'top',
    autoHide: true,
  })
}

export function errorMessage(message: any) {
  showMessage({
    message: message,
    type: 'danger',
    statusBarHeight: 50,
    animated: true,
    duration: 2000,
    icon: 'danger',
    position: 'top',
    autoHide: true,
  })
}

// Local Storage

export function saveAccessToken(token: string): Promise<null> {
  return SInfo.setItem(ACCESS_TOKEN, token, {});
}

export function saveUserId(id: string): Promise<null> {
  return SInfo.setItem(USER_ID, id, {});
}

export function getAccessToken(): Promise<string> {
  return SInfo.getItem(ACCESS_TOKEN, {});
}

export function getUserId(): Promise<string> {
  return SInfo.getItem(USER_ID, {});
}

export function deleteAccessToken(): Promise<null> {
  return SInfo.deleteItem(ACCESS_TOKEN, {});
}