function csvToTree(csvData) {
    var root = d3.stratify()
        .id(function(d) { return d.path; })
        .parentId(function(d) { return d.path.substring(0, d.path.lastIndexOf("/")); })
       (csvData)
        .sum(function(d) { return d.size; })
        .sort(function(a, b) { return b.height - a.height || b.value - a.value; });
    console.log(root);
    
    return root;
}

function csvToCircle(csvData) {
    // TODOS:
    
}