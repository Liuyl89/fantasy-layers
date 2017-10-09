import { registerLayer } from '../layerRepo'

const tianditu4490Config = {
    fullExtent: {
        xmin: -180.0,
        ymin: -90.0,
        xmax: 180.0,
        ymax: 90.0,
        spatialReference: { wkid: 4490 },
    },
    spatialReference: { wkid: 4490 },
    tileInfo: {
        size: 256,
        dpi: 90.71428571428571,
        format: 'png32',
        origin: {
            x: -180,
            y: 90,
        },
        spatialReference: { wkid: 4490 },
        lods: [
            {
                level: 1,
                resolution: 0.703125,
                scale: 295497593.05875003,
            }, {
                level: 2,
                resolution: 0.3515625,
                scale: 147748796.52937502,
            }, {
                level: 3,
                resolution: 0.17578125,
                scale: 73874398.264687508,
            }, {
                level: 4,
                resolution: 0.087890625,
                scale: 36937199.132343754,
            }, {
                level: 5,
                resolution: 0.0439453125,
                scale: 18468599.566171877,
            }, {
                level: 6,
                resolution: 0.02197265625,
                scale: 9234299.7830859385,
            }, {
                level: 7,
                resolution: 0.010986328125,
                scale: 4617149.8915429693,
            }, {
                level: 8,
                resolution: 0.0054931640625,
                scale: 2308574.9457714846,
            }, {
                level: 9,
                resolution: 0.00274658203125,
                scale: 1154287.4728857423,
            }, {
                level: 10,
                resolution: 0.001373291015625,
                scale: 577143.73644287116,
            }, {
                level: 11,
                resolution: 0.0006866455078125,
                scale: 288571.86822143558,
            }, {
                level: 12,
                resolution: 0.00034332275390625,
                scale: 144285.93411071779,
            }, {
                level: 13,
                resolution: 0.000171661376953125,
                scale: 72142.967055358895,
            }, {
                level: 14,
                resolution: 8.58306884765625e-005,
                scale: 36071.483527679447,
            }, {
                level: 15,
                resolution: 4.291534423828125e-005,
                scale: 18035.741763839724,
            }, {
                level: 16,
                resolution: 2.1457672119140625e-005,
                scale: 9017.8708819198619,
            }, {
                level: 17,
                resolution: 1.0728836059570313e-005,
                scale: 4508.9354409599309,
            }, {
                level: 18,
                resolution: 5.3644180297851563e-006,
                scale: 2254.4677204799655,
            }, {
                level: 19,
                resolution: 0.000002682209014892578,
                scale: 1127.2338602399827,
            }, {
                level: 20,
                resolution: 0.000001341104507446289,
                scale: 563.6169301199914,
            },
        ],
    },
}
const tianditu4326Config = _.cloneDeep(tianditu4490Config)
tianditu4326Config.fullExtent.spatialReference.wkid = 4326
tianditu4326Config.spatialReference.wkid = 4326
tianditu4326Config.tileInfo.spatialReference.wkid = 4326
const tianditu102100Config = {
    fullExtent: {
        xmin: -20037508.3427892,
        ymin: -20037508.3427892,
        xmax: 20037508.3427892,
        ymax: 20037508.3427892,
        spatialReference: { wkid: 102100 },
    },
    spatialReference: { wkid: 102100 },
    tileInfo: {
        size: 256,
        dpi: 90.71428571428571,
        format: 'png32',
        origin: {
            x: -20037508.3427892,
            y: 20037508.342787,
        },
        spatialReference: { wkid: 102100 },
        lods: [
            {
                level: 1,
                resolution: 78271.51696402048,
                scale: 2.958293554545656E8,
            }, {
                level: 2,
                resolution: 39135.75848201024,
                scale: 1.479146777272828E8,
            }, {
                level: 3,
                resolution: 19567.87924100512,
                scale: 7.39573388636414E7,
            }, {
                level: 4,
                resolution: 9783.93962050256,
                scale: 3.69786694318207E7,
            }, {
                level: 5,
                resolution: 4891.96981025128,
                scale: 1.848933471591035E7,
            }, {
                level: 6,
                resolution: 2445.98490512564,
                scale: 9244667.357955175,
            }, {
                level: 7,
                resolution: 1222.99245256282,
                scale: 4622333.678977588,
            }, {
                level: 8,
                resolution: 611.49622628141,
                scale: 2311166.839488794,
            }, {
                level: 9,
                resolution: 305.748113140705,
                scale: 1155583.419744397,
            }, {
                level: 10,
                resolution: 152.8740565703525,
                scale: 577791.7098721985,
            }, {
                level: 11,
                resolution: 76.43702828517625,
                scale: 288895.85493609926,
            }, {
                level: 12,
                resolution: 38.21851414258813,
                scale: 144447.92746804963,
            }, {
                level: 13,
                resolution: 19.109257071294063,
                scale: 72223.96373402482,
            }, {
                level: 14,
                resolution: 9.554628535647032,
                scale: 36111.98186701241,
            }, {
                level: 15,
                resolution: 4.777314267823516,
                scale: 18055.990933506204,
            }, {
                level: 16,
                resolution: 2.388657133911758,
                scale: 9027.995466753102,
            }, {
                level: 17,
                resolution: 1.194328566955879,
                scale: 4513.997733376551,
            }, {
                level: 18,
                resolution: 0.5971642834779395,
                scale: 2256.998866688275,
            }, {
                level: 19,
                resolution: 0.298582738909933,
                scale: 1128.49943336487,
            }, {
                level: 20,
                resolution: 0.1492913694549665,
                scale: 564.249716682435,
            },
        ],
    },
}
const repo = {
    'tianditu-dlg-4490': _.assignIn({
        layerType: 'WebTile',
        label: '国家天地图矢量底图',
        urlTemplate: 'http://t{subDomain}.tianditu.com/vec_c/wmts' +
        '?SERVICE=WMTS&VERSION=1.0.0&REQUEST=GetTile&FORMAT=tiles&TILEMATRIXSET=c' +
        '&STYLE=default&LAYER=vec&TILEMATRIX={level}&TILEROW={row}&TILECOL={col}',
        subDomains: ['0', '1', '2', '3', '4', '5', '6', '7'],
    }, tianditu4490Config),
    'tianditu-dlg-anno-4490': _.assignIn({
        layerType: 'WebTile',
        label: '国家天地图矢量底图注记',
        urlTemplate: 'http://t{subDomain}.tianditu.com/cva_c/wmts' +
        '?SERVICE=WMTS&VERSION=1.0.0&REQUEST=GetTile&FORMAT=tiles&TILEMATRIXSET=c' +
        '&STYLE=default&LAYER=cva&TILEMATRIX={level}&TILEROW={row}&TILECOL={col}',
        subDomains: ['0', '1', '2', '3', '4', '5', '6', '7'],
    }, tianditu4490Config),
    'tianditu-drg-4490': _.assignIn({
        layerType: 'WebTile',
        label: '国家天地图影像底图',
        urlTemplate: 'http://t{subDomain}.tianditu.com/img_c/wmts' +
        '?SERVICE=WMTS&VERSION=1.0.0&REQUEST=GetTile&FORMAT=tiles&TILEMATRIXSET=c' +
        '&STYLE=default&LAYER=img&TILEMATRIX={level}&TILEROW={row}&TILECOL={col}',
        subDomains: ['0', '1', '2', '3', '4', '5', '6', '7'],
    }, tianditu4490Config),
    'tianditu-dlg-4326': _.assignIn({
        layerType: 'WebTile',
        label: '国家天地图矢量底图',
        urlTemplate: 'http://t{subDomain}.tianditu.com/vec_c/wmts' +
        '?SERVICE=WMTS&VERSION=1.0.0&REQUEST=GetTile&FORMAT=tiles&TILEMATRIXSET=c' +
        '&STYLE=default&LAYER=vec&TILEMATRIX={level}&TILEROW={row}&TILECOL={col}',
        subDomains: ['0', '1', '2', '3', '4', '5', '6', '7'],
    }, tianditu4326Config),
    'tianditu-dlg-anno-4326': _.assignIn({
        layerType: 'WebTile',
        label: '国家天地图矢量底图注记',
        urlTemplate: 'http://t{subDomain}.tianditu.com/cva_c/wmts' +
        '?SERVICE=WMTS&VERSION=1.0.0&REQUEST=GetTile&FORMAT=tiles&TILEMATRIXSET=c' +
        '&STYLE=default&LAYER=cva&TILEMATRIX={level}&TILEROW={row}&TILECOL={col}',
        subDomains: ['0', '1', '2', '3', '4', '5', '6', '7'],
    }, tianditu4326Config),
    'tianditu-drg-4326': _.assignIn({
        layerType: 'WebTile',
        label: '国家天地图影像底图',
        urlTemplate: 'http://t{subDomain}.tianditu.com/img_c/wmts' +
        '?SERVICE=WMTS&VERSION=1.0.0&REQUEST=GetTile&FORMAT=tiles&TILEMATRIXSET=c' +
        '&STYLE=default&LAYER=img&TILEMATRIX={level}&TILEROW={row}&TILECOL={col}',
        subDomains: ['0', '1', '2', '3', '4', '5', '6', '7'],
    }, tianditu4326Config),
    'tianditu-drg-anno-4326': _.assignIn({
        layerType: 'WebTile',
        label: '国家天地图影像底图注记',
        urlTemplate: 'http://t{subDomain}.tianditu.com/cia_c/wmts' +
        '?SERVICE=WMTS&VERSION=1.0.0&REQUEST=GetTile&FORMAT=tiles&TILEMATRIXSET=c' +
        '&STYLE=default&LAYER=cia&TILEMATRIX={level}&TILEROW={row}&TILECOL={col}',
        subDomains: ['0', '1', '2', '3', '4', '5', '6', '7'],
    }, tianditu4326Config),
    'tianditu-dlg-102100': _.assignIn({
        layerType: 'WebTile',
        label: '国家天地图矢量底图',
        urlTemplate: 'http://t{subDomain}.tianditu.com/vec_w/wmts' +
        '?SERVICE=WMTS&VERSION=1.0.0&REQUEST=GetTile&FORMAT=tiles&TILEMATRIXSET=w' +
        '&STYLE=default&LAYER=vec&TILEMATRIX={level}&TILEROW={row}&TILECOL={col}',
        subDomains: ['0', '1', '2', '3', '4', '5', '6', '7'],
    }, tianditu102100Config),
    'tianditu-dlg-anno-102100': _.assignIn({
        layerType: 'WebTile',
        label: '国家天地图矢量底图注记',
        urlTemplate: 'http://t{subDomain}.tianditu.com/cva_w/wmts' +
        '?SERVICE=WMTS&VERSION=1.0.0&REQUEST=GetTile&FORMAT=tiles&TILEMATRIXSET=w' +
        '&STYLE=default&LAYER=cva&TILEMATRIX={level}&TILEROW={row}&TILECOL={col}',
        subDomains: ['0', '1', '2', '3', '4', '5', '6', '7'],
    }, tianditu102100Config),
    'tianditu-drg-102100': _.assignIn({
        layerType: 'WebTile',
        label: '国家天地图影像底图',
        urlTemplate: 'http://t{subDomain}.tianditu.com/img_w/wmts' +
        '?SERVICE=WMTS&VERSION=1.0.0&REQUEST=GetTile&FORMAT=tiles&TILEMATRIXSET=w' +
        '&STYLE=default&LAYER=img&TILEMATRIX={level}&TILEROW={row}&TILECOL={col}',
        subDomains: ['0', '1', '2', '3', '4', '5', '6', '7'],
    }, tianditu102100Config),
    'tianditu-drg-anno-102100': _.assignIn({
        layerType: 'WebTile',
        label: '国家天地图影像底图注记',
        urlTemplate: 'http://t{subDomain}.tianditu.com/cia_w/wmts' +
        '?SERVICE=WMTS&VERSION=1.0.0&REQUEST=GetTile&FORMAT=tiles&TILEMATRIXSET=w' +
        '&STYLE=default&LAYER=cia&TILEMATRIX={level}&TILEROW={row}&TILECOL={col}',
        subDomains: ['0', '1', '2', '3', '4', '5', '6', '7'],
    }, tianditu102100Config),
}

_.each(repo, (opts, key) => {
    registerLayer(key, opts)
})
