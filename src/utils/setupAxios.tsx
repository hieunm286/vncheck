import {SignMessage} from '../app/pages/auth/service/auth-cryptography';
import {actionTypes} from '../app/pages/auth/_redux/auth-redux';
import {AxiosStatic} from "axios";
import {EnhancedStore} from "@reduxjs/toolkit";

const GetURLEndPoint = (url: string) => {
  const index = url.indexOf('/api/');
  const lastIndex = url.lastIndexOf('/')

  if (index ===-1 && lastIndex === -1) return url;

  let endPoint: string = '';

  if (lastIndex - index === 4) {
    endPoint = url.substring(lastIndex + 1)
  } else {
    endPoint = url.substring(index + 5, lastIndex)
  }

  const re = /-/gi
  let finalEndPoint= endPoint.replace(re, '_');

  return finalEndPoint;
}


export default function setupAxios(axios: AxiosStatic, store: EnhancedStore) {
  axios.interceptors.request.use(
    (config) => {
      console.log(config);
      const {auth} = store.getState();
      if (auth) {
        config.headers.Authorization = `${JSON.stringify(auth._certificate)}`;
      }
      if (config.method !== 'GET') {
        if (config.data) {
          if (auth._privateKey) {
            if (config.data instanceof FormData) {
              const sig = JSON.stringify(Object.fromEntries(config.data));
              const signature = SignMessage(auth._privateKey, sig);
              config.headers['Content-Type'] = 'multipart/form-data';
              config.data.append('_signature', signature);
              return config;
            } else {
              const signature = SignMessage(auth._privateKey, config.data);
              // const or: any = {...config.data};
              config.data = {
                ...config.data,
                actionType: ('' + config.method + ':' + GetURLEndPoint(config.url ? config.url : '')).toUpperCase(),
                _signature: signature,
              };
            }
          }
        } else {
          config.data = {
            actionType: ('' + config.method + ':' + GetURLEndPoint(config.url ? config.url : '')).toUpperCase(),
          };

          const signature = SignMessage(auth._privateKey, config.data);
          config.data = {
            ...config.data,
            _signature: signature,
          };
        }
      }
      return config;
    },
    (err) => Promise.reject(err),
  );
  axios.interceptors.response.use(
    (next) => {
      const nextData = next.data;
      // console.log(nextData);
      if (nextData && (nextData.success === false || nextData.success === 'false')) {
        if (nextData.reason === 'AUTH.ERROR.NEED_TO_CHANGE_PASSWORD') {
        } else if (nextData.reason.indexOf('AUTH.ERROR.') > -1) {
          store.dispatch({type: actionTypes.Logout, payload: nextData.reason});
        }
        return Promise.reject({response: {data: nextData.reason}})
      }
      return Promise.resolve(nextData);
    },
    (error) => {
      const errorCode = error.response.data;
      //const responseRegex = /\bAUTH.ERROR./i;
      if (errorCode === 'AUTH.ERROR.NEED_TO_CHANGE_PASSWORD') {
      } else if (errorCode.indexOf('AUTH.ERROR.') > -1) {
        // console.log(errorCode);
        store.dispatch({type: actionTypes.Logout, payload: errorCode});
      }
      return Promise.reject(error);
    },
  );
}
