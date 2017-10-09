const layerMap = new Map()
function registerLayer(key, options) {
    if (layerMap.has(key)) {
        throw new Error(`Layer ${key} multiple defined!`)
    } else {
        layerMap.set(key, options)
    }
}
function getLayerOption(key) {
    if (!layerMap.has(key)) {
        throw new Error(`Layer ${key} undefined!`)
    } else {
        return layerMap.get(key)
    }
}
export { layerMap, registerLayer, getLayerOption }
