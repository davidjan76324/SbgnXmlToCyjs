/*
    Write by davidjan.
*/
let convert = require('sbgnml-to-cytoscape');
function processTheSbgnXmlFile(data: any): ReturnMsg {
    try {
        let cyGraph = convert(data);
        let nodeList = cyGraph.nodes;
        nodeList = addObj(nodeList, "group", "nodes");

        let edgeList = cyGraph.edges;
        edgeList = addObj(edgeList, "group", "edges");

        let allList: object[] = [];
        allList = nodeList.concat(edgeList) //combine nodes and edges list
        return { code: 200, msg: allList };
    } catch (e) {
        let ermsg = `-- Process The SbgnXml File Error: ${e}`;
        return { code: 500, msg: ermsg };
    }
};

function addObj(objList: object[], key: string, value: (string | number)) {
    let returnList: any[] = [];
    try {
        returnList = objList.map(function (item: any, index, array) {
            item.data[key] = value;
            return item;
        });
    } catch (e) {
        console.log(`-- Error: add obj error!`);
        return [];
    }

    return returnList;
}

module.exports = {
    processTheSbgnXmlFile,
    addObj,
}