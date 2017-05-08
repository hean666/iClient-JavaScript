/**
 * Class: SuperMap.GetFeaturesByBoundsParameters
 * 数据集范围查询参数类。
 * 该类用于设置数据集范围查询的相关参数。
 *
 * Inherits from:
 *  - <SuperMap.GetFeaturesParametersBase>
 */
require('../REST');
require('./GetFeaturesParametersBase');
var SuperMap = require('../SuperMap');
SuperMap.GetFeaturesByBoundsParameters = SuperMap.Class(SuperMap.GetFeaturesParametersBase, {

    /**
     * Property: getFeatureMode
     * {String} 数据集查询模式。
     * 范围查询有"BOUNDS"，"BOUNDS_ATTRIBUTEFILTER"两种,当用户设置attributeFilter时会自动切换到BOUNDS_ATTRIBUTEFILTER访问服务。
     */
    getFeatureMode: null,

    /**
     * APIProperty: bounds
     * {<SuperMap.Bounds>} 用于查询的范围对象。
     */
    bounds: null,

    /**
     * APIProperty: fields
     * {Array(String)} 设置查询结果返回字段。
     *                 当指定了返回结果字段后，则 GetFeaturesResult 中的 features 的属性字段只包含所指定的字段。
     *                 不设置即返回全部字段。
     */
    fields: null,

    /**
     * APIProperty: attributeFilter
     * {String} 范围查询属性过滤条件。
     */
    attributeFilter: null,

    /**
     * APIProperty: spatialQueryMode
     * {<SuperMap.SpatialQueryMode>} 空间查询模式常量，必设参数，默认为CONTAIN。
     */
    spatialQueryMode: SuperMap.SpatialQueryMode.CONTAIN,

    /**
     * Constructor: SuperMap.GetFeaturesByBoundsParameters
     * 范围空间查询参数类构造函数。
     *
     * Parameters:
     * options - {Object} 参数。
     *
     * Allowed options properties:
     * bounds - {<SuperMap.Bounds>} 用于查询的范围对象。
     * attributeFilter - {String} 范围查询属性过滤条件。
     * fields - {Array(String)} 设置查询结果返回字段。默认返回所有字段。
     * spatialQueryMode - {<SuperMap.SpatialQueryMode>} 空间查询模式常量,必设参数。
     * queryParameter - {<SuperMap.FilterParameter>} 查询过滤条件参数。
     * datasetNames - {Array(String)} 数据集集合中的数据集名称列表。
     * returnContent - {Boolean} 是否直接返回查询结果。
     * fromIndex - {Integer} 查询结果的最小索引号。
     * toIndex - {Integer} 查询结果的最大索引号。
     */
    initialize: function (options) {
        this.getFeatureMode = SuperMap.GetFeaturesByBoundsParameters.getFeatureMode.BOUNDS;
        SuperMap.GetFeaturesParametersBase.prototype.initialize.apply(this, arguments);
        if (!options) {
            return;
        }
        SuperMap.Util.extend(this, options);
    },

    /**
     * APIMethod: destroy
     * 释放资源，将引用资源的属性置空。
     */
    destroy: function () {
        var me = this;
        SuperMap.GetFeaturesParametersBase.prototype.destroy.apply(me, arguments);
        if (me.bounds) {
            me.bounds.destroy();
            me.bounds = null;
        }
        if (me.fields) {
            while (me.fields.length > 0) {
                me.fields.pop();
            }
            me.fields = null;
        }
        me.attributeFilter = null;
        me.spatialQueryMode = null;
        me.getFeatureMode = null;
    },
    CLASS_NAME: "SuperMap.GetFeaturesByBoundsParameters"
});

/**
 * Function: SuperMap.GetFeaturesByBoundsParameters.toJsonParameters
 * 将<SuperMap.GetFeaturesByBoundsParameters>对象参数转换为json字符串。
 *
 * Parameters:
 * params - {<SuperMap.GetFeaturesByBoundsParameters>} 范围查询参数。
 *
 * Returns:
 * {String} 转化后的 json字符串。
 */
SuperMap.GetFeaturesByBoundsParameters.toJsonParameters = function (params) {
    var filterParameter,
        bounds,
        parasByBounds;

    bounds = {
        "leftBottom": {"x": params.bounds.left, "y": params.bounds.bottom},
        "rightTop": {"x": params.bounds.right, "y": params.bounds.top}
    };
    parasByBounds = {
        datasetNames: params.datasetNames,
        getFeatureMode: SuperMap.GetFeaturesByBoundsParameters.getFeatureMode.BOUNDS,
        bounds: bounds,
        spatialQueryMode: params.spatialQueryMode
    };
    if (params.fields) {
        filterParameter = new SuperMap.FilterParameter();
        filterParameter.name = params.datasetNames;
        filterParameter.fields = params.fields;
        parasByBounds.queryParameter = filterParameter;
    }
    if (params.attributeFilter) {
        parasByBounds.attributeFilter = params.attributeFilter;
        parasByBounds.getFeatureMode = SuperMap.GetFeaturesByBoundsParameters.getFeatureMode.BOUNDS_ATTRIBUTEFILTER;
    }

    return SuperMap.Util.toJSON(parasByBounds);
};

SuperMap.GetFeaturesByBoundsParameters.getFeatureMode = {
    "BOUNDS": "BOUNDS",
    "BOUNDS_ATTRIBUTEFILTER": "BOUNDS_ATTRIBUTEFILTER"
};

module.exports = SuperMap.GetFeaturesByBoundsParameters;