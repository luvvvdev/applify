import config from "../../config";

const getAssetUrl = (path: string) => config.ASSETS_URL + path;

export default getAssetUrl;
