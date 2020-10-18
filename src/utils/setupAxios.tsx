import {SignMessage, VerifyMessage} from '../app/pages/auth/service/auth-cryptography';
import {actions, actionTypes} from '../app/pages/auth/_redux/auth-redux';
import {AxiosStatic} from "axios";

export default function setupAxios(axios: AxiosStatic, store: any) {
    axios.interceptors.request.use(
        (config) => {
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
                                _signature: signature,
                            };
                        }
                    }
                }
            }
            return config;
        },
        (err) => Promise.reject(err),
    );
    axios.interceptors.response.use(
        (next) => {
            const nextData = next.data;
            console.log(nextData);
            if (nextData && (nextData.success === false || nextData.success === 'false')) {
                if (nextData.reason === 'AUTH.ERROR.NEED_TO_CHANGE_PASSWORD') {
                } else if (nextData.reason.indexOf('AUTH.ERROR.') > -1) {
                    store.dispatch({type: actionTypes.Logout});
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
                store.dispatch({type: actionTypes.Logout});
            }
            return Promise.reject(error);
        },
    );
}
