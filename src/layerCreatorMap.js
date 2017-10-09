import LayerType from './LayerType'

const creatorMap = new Map()
function registerCreator(creator) {
    const type = creator.type
    if (!(type instanceof LayerType)) {
        throw new Error('registerCreator need a LayerType type argument!')
    }
    if (!creatorMap.has(type.platform)) {
        creatorMap.set(type.platform, new Map())
    }
    const platformCreatorMap = creatorMap.get(type.platform)
    if (!platformCreatorMap.has(type.layerType)) {
        platformCreatorMap.set(type.layerType, [])
    }
    const typeSet = platformCreatorMap.get(type.layerType)
    if (typeSet.includes(creator)) {
        throw new Error('Layer creator multiple defined!')
    } else {
        typeSet.push(creator)
    }
}
function matchCreator(type) {
    let layerType = type
    if (!(layerType instanceof LayerType)) {
        layerType = new LayerType(layerType)
    }
    let creator
    if (creatorMap.has(layerType.platform)
        && creatorMap.get(layerType.platform).has(layerType.layerType)) {
        const typeSet = creatorMap.get(layerType.platform).get(layerType.layerType)
        creator = typeSet.find((c) => {
            return c.match(layerType)
        })
    }
    return creator || null
}
export { creatorMap, registerCreator, matchCreator }
