import env from '../env'

if (window.require) {
    window.require(['esri/kernel'], (esriNS) => {
        env.platform.type = 'arcgis'
        env.platform.version = esriNS.version
    })
}
