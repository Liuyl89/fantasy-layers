import { registerCreator } from '../../../layerCreatorMap'
import LayerType from '../../../LayerType'

class ArcgisWebTile4Creator {
    constructor() {
        this.type = new LayerType({
            platform: 'arcgis',
            layerType: 'WebTile',
            version: '4',
        })
    }

    create(options, callback) {
        window.require(
            ['esri/layers/WebTileLayer', 'esri/layers/support/TileInfo', 'esri/geometry/Extent',
                'esri/layers/support/Lod', 'esri/geometry/SpatialReference'],
            (WebTileLayer, TileInfo, Extent, Lod, SpatialReference) => {
                const opts = _.cloneDeep(options)
                if (opts.tileInfo && !(opts.tileInfo instanceof TileInfo)) {
                    // if (opts.fullExtent) {
                    //     opts.fullExtent =
                    //         new Extent(opts.tileInfo.fullExtent)
                    // }
                    if (opts.spatialReference) {
                        opts.spatialReference =
                            new SpatialReference(opts.spatialReference)
                    }
                    if (_.isArray(opts.tileInfo.lods)) {
                        opts.tileInfo.lods = _.map(opts.tileInfo.lods, (l) => {
                            return new Lod(l)
                        })
                    }
                }
                callback(null, new WebTileLayer(options))
            },
        )
    }

    match(type) {
        return type.platform === this.type.platform
            && type.layerType === this.type.layerType
            && type.version[0]
            && type.version[0] === this.type.version
    }
}

registerCreator(new ArcgisWebTile4Creator())
export default ArcgisWebTile4Creator
