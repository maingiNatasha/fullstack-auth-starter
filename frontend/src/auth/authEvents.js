let onUnauthorized = null;

export function setUnauthorizedHandler(handler) {
    onUnauthorized = handler;
}

export function triggerUnauthorized(payload = {}) {
    if (onUnauthorized) {
        onUnauthorized(payload);
    }
}