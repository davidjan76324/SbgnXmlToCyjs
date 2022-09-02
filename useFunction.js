"use strict";
let convert = require('sbgnml-to-cytoscape');
function processTheSbgnXmlFile(data) {
    try {
        let cyGraph = convert(data);
        let nodeList = cyGraph.nodes;
        nodeList = addObj(nodeList, "group", "nodes");
        let edgeList = cyGraph.edges;
        edgeList = addObj(edgeList, "group", "edges");
        let allList = [];
        allList = nodeList.concat(edgeList); //combine nodes and edges list
        return { code: 200, msg: allList };
    }
    catch (e) {
        let ermsg = `-- Process The SbgnXml File Error: ${e}`;
        return { code: 500, msg: ermsg };
    }
}
;
function addObj(objList, key, value) {
    let returnList = [];
    try {
        returnList = objList.map(function (item, index, array) {
            item.data[key] = value;
            return item;
        });
    }
    catch (e) {
        console.log(`-- Error: add obj error!`);
        return [];
    }
    return returnList;
}
module.exports = {
    processTheSbgnXmlFile,
    addObj,
};
