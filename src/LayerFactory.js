import { matchCreator } from './layerCreatorMap'
import { getLayerOption } from './layerRepo'
import './repos'
import env from './env'

class LayerFactory {
    create(options, callback) {
        let opts = options
        if (_.isString(opts)) {
            opts = getLayerOption(opts)
        }
        if (!opts.platform) {
            opts.platform = env.platform.type
        }
        if (!opts.version) {
            opts.version = env.platform.version
        }
        const creator = matchCreator(opts)
        if (creator) {
            creator.create(opts, callback)
        } else {
            throw new Error('无法匹配到对应的图层类型')
        }
    }
}
const layerFactory = new LayerFactory()
function getLayer(opts, callback) {
    layerFactory.create(opts, callback)
}

export { getLayer }
