

class LayerType {
    constructor(type) {
        this.platform = type.platform
        this.layerType = type.layerType
        this.version = type.version
    }

    match(type) {
        return this.platform === type.platform
            && this.layerType === type.layerType
            && this.version === type.version
    }

    getKey() {
        return `${this.platform}-${this.layerType}-${this.version}`
    }
}
export default LayerType
