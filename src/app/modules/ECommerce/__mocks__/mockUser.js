import userTableMock from './userTableMock'

export default function mockUser(mock) {
    console.log('runnn')
    mock.onGet(/api\/user\/\d+/).reply(config => {
        const id = config.url.match(/api\/user\/(\d)/)[1];
        const user = userTableMock.find(el => el.id === +id)

        if (!user) {
            return [400];
        }

        console.log(user)

        return [200, user]
    })
}