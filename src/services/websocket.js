let ws = undefined;
function getWebsocket(url) {
    console.log('websocket client', ws);
    if (!ws) {
        ws = new WebSocket(url);
    }
    return ws;
}

export async function watchList(config, cb) {
    const ws = getWebsocket(config.url);
    ws.onopen = () => {
        ws.send(JSON.stringify({type: 'login', ...config}));
    };
    ws.onmessage = (evt) => {
        const data = JSON.parse(evt.data);
        console.log(data);
        if (data) {
            switch (data.type) {
                case 'ping':
                    ws.send('{"type":"pong"}');
                    // cb(data);
                    break;
                case 'login':
                case 'message':
                    // cb(data);
                    new Promise(function (resolve, reject) {
                        return resolve({data});
                    });
                    break;
                // 用户退出 更新用户列表
                case 'logout':
                    break;
            }
        }
    };
}

export async function send(config, data) {
    console.log('send', data);
    const ws = getWebsocket(config.url);
    ws.send(JSON.stringify(data));
}

export async function logout(config, code, reason) {
    const ws = getWebsocket(config.url);
    ws.close(code, reason);
}