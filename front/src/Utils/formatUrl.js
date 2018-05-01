import config from "../config";

const ApiUri = `${config.SERVER_PROTOCOL}${config.SERVER_ADDRESS}:${config.SERVER_PORT}`;

export function formatUrl(path) {
    return `${ApiUri}${path[0] !== '/' ? '/' + path : path}`;
}
