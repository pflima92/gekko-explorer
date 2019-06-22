let version = process.env.REACT_APP_VERSION;

export const setConfig = (config) => {
    localStorage.setItem('config', JSON.stringify(config));
}

export const getConfig = () => {

    let configAsString = localStorage.getItem('config');
    let config = JSON.parse(configAsString);
    return {
        baseUrl: (config && config.baseUrl) || 'http://localhost:5000',
        websocket: (config && config.websocket) || 'ws://localhost:5000',
        version: version,
        ...config
    };
}