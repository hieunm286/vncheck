import { SignMessage, VerifyMessage } from '../app/modules/Auth/service/AuthCryptography';

export default function setupAxios(axios: any, store: any) {
  axios.interceptors.request.use(
    (config: {
      headers: { [x: string]: string; Authorization: string };
      data: { _signature: string };
      method: string;
    }) => {
      const { auth } = store.getState();

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
              const or: any = { ...config.data };

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
    (err: any) => Promise.reject(err),
  );
}
