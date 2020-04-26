import * as d3 from 'd3';

function barChartUtility(data, height, width) {
    var barChartNode = document.getElementById("barChartCt");
    if (barChartNode !== null) {
        while (barChartNode.firstChild) {
            barChartNode.removeChild(barChartNode.firstChild);
        }
    }

    const margin = { top: 20, right: 20, bottom: 30, left: 50 }
    var svg = d3.select("#barChartCt")
        .append("svg")
        .attr("width", width)
        .attr("height", 245)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Add label for x-axis
    svg.append("text")
        .attr("transform",
            "translate(" + (width / 2) + " ," +
            (height + margin.top + 10) + ")")
        .style("text-anchor", "middle")
        .style('font-family', "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif")
        .style('fill', '#bcbcbc')
        .text("Country");

    //Add label for y-axis
    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", -50)
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .style('font-family', "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif")
        .style('fill', '#bcbcbc')
        .text("Count");

    var tooltip = d3.select('.barChart_tooltip').style('display', 'none').style('opacity', 0);

    var x = d3.scaleBand().rangeRound([0, width]).padding(0.40),
        y = d3.scaleLinear().rangeRound([height, 2]);

    x.domain(data.map(function (d) { return d.country; }));
    y.domain([0, d3.max(data, function (d) { return d.customers; })]);

    svg.append("g")
        .attr("class", "axis axis--x")
        .attr("color", "#bcbcbc")
        .style('font-family', "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x).tickSize(0));

    svg.append("g")
        .attr("class", "axis axis--y")
        .attr("color", "#bcbcbc")
        .style('font-family', "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif")
        .call(d3.axisLeft(y).tickFormat(d3.format('.0f')).ticks(5))
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 7)
        .attr("dy", "0.71em")
        .attr("text-anchor", "end");

    svg.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "barChart-bar")
        .attr("fill", "#ffa873")
        .attr("x", function (d) { return x(d.country); })
        .attr("y", function (d) { return y(d.customers); })
        .attr("width", x.bandwidth())
        .attr("height", function (d) { return height - y(d.customers); })
        .on('mouseover.barChart_tooltip', function (d) {
            tooltip.transition()
                .duration(100)
                .style('display', 'block')
                .style("opacity", 2)
                .style("z-index", 4)
                .style("left", (d3.event.pageX - 50) + "px")
                .style("top", (d3.event.pageY - 40) + "px");

            tooltip.html("<label class='chart-tooltip-text'>" + d.customers + " Customers</label> <div class='tooltip-bottom-arrow_box'></div>")
        })
        .on("mouseout.barChart_tooltip", function () {
            tooltip.transition()
                .duration(100)
                .style("opacity", 0)
                .style("z-index", 4);
        })
        .on("mousemove.barChart_tooltip", function () {
            tooltip.style("left", (d3.event.pageX - 50) + "px")
                .style("top", (d3.event.pageY - 40) + "px");
        });

        svg.selectAll(".bar")
        .data(data)
        .enter().append("text")
        .attr("class", "label")
            //y position of the label is halfway down the bar
            /* .attr("y", function (d) {
                return y(d.name) + y.rangeBand() / 2 + 4;
            }) */
            //x position is 3 pixels to the right of the bar
            .attr("y", function (d) {
                return y(d.value) + 33;
            })
            .text(function (d) {
                return d.value;
            });

}

export { barChartUtility }