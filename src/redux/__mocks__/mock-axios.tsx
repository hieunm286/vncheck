import MockAdapter from 'axios-mock-adapter';
import mockAuth from '../../app/pages/auth/__mocks__/mockAuth';
import mockCustomers from '../../_metronic/modules/ECommerce/__mocks__/mockCustomer';
import mockProducts from '../../_metronic/modules/ECommerce/__mocks__/mockProduct';
import mockRemarks from '../../_metronic/modules/ECommerce/__mocks__/mockRemark';
import mockSpecifications from '../../_metronic/modules/ECommerce/__mocks__/mockSpecification';
import mockUser from '../../_metronic/modules/ECommerce/__mocks__/mockUser';

export default function mockAxios(axios: any) {
    const mock = new MockAdapter(axios, {delayResponse: 300});
    mockAuth(mock);
    mockCustomers(mock);
    mockProducts(mock);
    mockRemarks(mock);
    mockSpecifications(mock);
    mockUser(mock);
    return mock;
}
