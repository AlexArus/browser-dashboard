export const isExtensionEnv = Boolean(chrome?.permissions);

export const getFavIconUrl = (url: string) => `chrome://favicon/${url}`;
