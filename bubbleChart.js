var bubbleChartVis = function() {
    var newBC ={
        drawBubbleChart: function(svg, data) {
            // console.log(data);
            
            const root = pack(data);

            var width = +svg.attr("width"),
                height = +svg.attr("height");

            var color = d3.scaleOrdinal(d3.schemeCategory20);

            var format = d3.format(",d");

            // beginning of bubbles
            const leaf = svg.selectAll("g")
                .data(data.leaves())
                .join("g")
                .attr("transform", d => `translate(${d.x + 1},${d.y + 1})`);
            
            leaf.append("circle")
                .attr("id", d => (d.leafUid = DOM.uid("leaf")).id)
                .attr("r", d => d.r)
                .attr("fill-opacity", 0.7)
                .attr("fill", function(d) { 
                    var a = d.ancestors(); 
                    return color(a[a.length - 2].id); 
                });

            leaf.append("clipPath")
                .attr("id", d => (d.clipUid = DOM.uid("clip")).id)
                .append("use")
                .attr("xlink:href", d => d.leafUid.href);

            leaf.append("text")
                .attr("clip-path", d => d.clipUid)
                .selectAll("tspan")
                .data(d => d.data.name.split(/(?=[A-Z][^A-Z])/g))
                .join("tspan")
                .attr("x", 0)
                .attr("y", (d, i, nodes) => `${i - nodes.length / 2 + 0.8}em`)
                .text(d => d);
          
            leaf.append("title")
                .text(d => `${d.data.title}\n${format(d.value)}`);
        }
    }
    return newBC;
}