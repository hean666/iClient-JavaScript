﻿import SuperMap from '../SuperMap';
import UGCSubLayer from './UGCSubLayer';
import ServerStyle from './ServerStyle';

/**
 * @class SuperMap.Vector
 * @classdesc UGC 矢量图层类。
 * @extends SuperMap.UGCSubLayer
 * @param options - {Object} 可选参数。如：<br>
 *        style - {SuperMap.ServerStyle} 矢量图层的风格。
 */

export default  class Vector extends UGCSubLayer {

    /**
     * @member SuperMap.Vector.prototype.style -{SuperMap.ServerStyle}
     * @description 矢量图层的风格。
     */
    style = null;

    /*
     * Constructor: SuperMap.Vector
     * UGC 矢量图层类构造函数。
     */
    constructor(options) {
        options = options || {};
        super(options);
    }

    /**
     * @inheritDoc
     */
    destroy() {
        super.destroy();
        SuperMap.Util.reset(this);
    }

    /**
     * @function SuperMap.Vector.prototype.fromJson
     * @description 将服务端JSON对象转换成当前客户端对象
     * @param jsonObject - {Object} 要转换的 JSON 对象。
     */
    fromJson(jsonObject) {
        super.fromJson(jsonObject);
        var sty = this.style;
        if (sty) {
            this.style = new ServerStyle(sty);
        }
    }

    /**
     * @function SuperMap.Vector.prototype.toServerJSONObject
     * @description 转换成对应的 JSON 格式对象。
     */
    toServerJSONObject() {
        var jsonObject = SuperMap.toServerJSONObject();
        if (jsonObject.style) {
            if (jsonObject.style.toServerJSONObject) {
                jsonObject.style = jsonObject.style.toServerJSONObject();
            }
        }
        return jsonObject;
    }

    CLASS_NAME = "SuperMap.Vector"
}

SuperMap.Vector = Vector;
