function createEventEmitter() {
    const listenersMap = {}

    return {
        on(evName, listener) {
            if (!listenersMap[evName]) {
                listenersMap[evName] = []
            }
            listenersMap[evName].push(listener)
            return () => {
                listenersMap[evName] = listenersMap[evName].filter(func => func !== listener)
            }
        },
        emit(evName, data) {
            if (!listenersMap[evName]) return
            listenersMap[evName].forEach(listener => listener(data))
        }
    }
}

export const eventBusService = createEventEmitter()

export function showUserMsg(txt, type = 'info', payload = {}) {
    eventBusService.emit('show-user-msg', { txt, type, payload})
}

export function showSuccessMsg(txt,payload) {
    showUserMsg(txt, 'success' , payload)
}

export function showErrorMsg(txt,payload) {
    showUserMsg(txt, 'error', payload)
}
