import * as service from '../services/websocket'

export default {
    namespace: 'websocket',
    state: {
        messages: undefined,
        client_id: undefined,
    },
    subscriptions: {
        watchWebSocket({dispatch, history}) {
            return history.listen(({pathname}) => {
                dispatch({type: 'open'});
            });
        }
    },
    effects: {
        * open({payload}, {put, call}) {
            //wss://echo.websocket.org
            const config = {url: 'wss://echo.websocket.org', user_name: 'xxx', user_id: 1, room_id: 999};
            // service.watchList(config, (data) => {
            //     dispatch({type: data.type, payload: data});
            // });
            const {data} = yield call(service.watchList, config);
            console.log('result', data);
        },
        * message({payload}, {put, call}) {
            console.log('message', payload);
            yield put({type: 'messageSuccess', payload: payload.client_id});
        },
        * send({payload}, {put, call}) {
            yield call(service.send, {config: {url: 'wss://echo.websocket.org'}, data: payload});
        },
    },

    reducers: {
        openSuccess(state, action) {
            //client_id:1
            return {...state, ... action.payload}
        },
        messageSuccess(state, action) {
            //messages{type:'message',data:{....}}
            return {...state, ... action.payload}
        },
    },
}