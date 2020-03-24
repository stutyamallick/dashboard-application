import * as d3 from 'd3';

function donutChartUtility(data, colors, radius) {
    
    var myNode = document.getElementById("donutChartCt");
    if (myNode !== null) {
        while (myNode.firstChild) {
            myNode.removeChild(myNode.firstChild);
        }
    };
    
    const svg = d3.select("#donutChartCt")
        .append("svg")
        .attr("width", radius*2)
        .attr("height", radius*2)
        .append("g")
        .attr("transform", `translate(${radius}, ${radius})`);
    const color = d3.scaleOrdinal(colors);
    var tooltip = d3.select('.donut_tooltip').style('display', 'none').style('opacity', 0);
    var noDataOverlay = d3.select('.noData_overlay').style('display', 'none').style('opacity', 0);

    const pie = d3.pie()
        .value(d => d.value)
        .sort(null);

    const arc = d3.arc()
        .innerRadius(radius - (radius/2.5))
        .outerRadius(radius - (radius/10));

    function arcTween(a) {
        const i = d3.interpolate(this._current, a);
        this._current = i(1);
        return (t) => arc(i(t));
    }

    update();

    function update() {
        let totalAlerts = 0;
        data.forEach(function (d) {
            totalAlerts = totalAlerts + d.value;
        })

        if (totalAlerts === 0) {
            noDataOverlay.style('display', 'block').style('opacity', 0.5);
        }
        const path = svg.selectAll("path")
            .data(pie(data));

        path.transition().duration(200).attrTween("d", arcTween);

        path.enter().append("path")
            .attr("fill", (d, i) => color(i))
            .attr("d", arc)
            .each(function (d) { this._current = d; });

        const chartPath = svg.selectAll("path");

        chartPath.on('mouseover.donut_tooltip', function (d) {
            const hoverArc = d3.arc().innerRadius(radius - (radius/2.25)).outerRadius(radius - (radius/15));
            d3.select(this).attr("d", hoverArc);

            tooltip.html("<label class='chart-tooltip-text'>" + d.value + " Customers </label> <div class='tooltip-left-arrow_box'></div>");
            tooltip.transition()
                .duration(100)
                .style('display', 'block')
                .style("opacity", 2)
                .style("z-index", 4)
                .style("left", (d3.event.pageX + 20) + "px")
                .style("top", (d3.event.pageY - 20) + "px");
        });
        chartPath.on("mouseout.donut_tooltip", function () {
            const hoverArc = d3.arc().innerRadius(radius - (radius/2.5)).outerRadius(radius - (radius/10));
            d3.select(this).attr("d", hoverArc);

            tooltip.transition()
                .duration(100)
                .style("opacity", 0)
                .style("z-index", 4);
        })
        chartPath.on("mousemove.donut_tooltip", function () {
            tooltip.style("left", (d3.event.pageX + 20) + "px")
                .style("top", (d3.event.pageY - 20) + "px");
        });

    }
}

export { donutChartUtility }