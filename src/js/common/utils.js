function getSearch(key) {
    var searchStr = location.search.slice(1)
    var searchArr = searchStr.split('&')
    var searchObj = {},
        tempArr;
    for (var i = 0; i < searchArr.length; i++) {
        tempArr = searchArr[i].split('=');
        searchObj[tempArr[0]] = tempArr[1]
    }
    return key ? searchObj[key] : searchObj;
}