import * as d3 from 'd3';
import moment from 'moment';

function lineChartUtility(data) {

    var myNode = document.getElementById("lineChartCt");
    if (myNode !== null) {
        while (myNode.firstChild) {
            myNode.removeChild(myNode.firstChild);
        }
    };

    var bandPos = [-1, -1];
    var xDomain, yDomain, xDomainMin, yDomainMin, zoomArea;
    xDomain = 0;
    yDomain = 0;
    xDomainMin = 0;
    yDomainMin = 0;
    // set the dimensions and margins of the graph
    var margin = { top: 20, right: 20, bottom: 30, left: 30 },
        width = 720,
        height = 240 - margin.top - margin.bottom;

    // set the ranges
    var x = d3.scaleTime()
        .range([0, width - 70]);
    var y = d3.scaleLinear().range([height, 0]);

    // first line definition //start
    var valueline = d3.line()
        .x(function (d) { return x(new Date(moment(d.date).format('DD MMM YYYY'))); })
        .y(function (d) { return y(d.customersJoined); })
        .curve(d3.curveMonotoneX);

    // second line definition
    var valueline2 = d3.line()
        .x(function (d) { return x(new Date(moment(d.date).format('DD MMM YYYY'))); })
        .y(function (d) { return y(d.customersLeft); })
        .curve(d3.curveMonotoneX);

    var drag = d3.drag();

    var svg = d3.select("#lineChartCt")
        .append("svg")
        .attr("width", width)
        .attr("height", height + margin.top + margin.bottom + 20)
        .append("g")
        .attr("transform",
            "translate(" + 40 + "," + margin.top + ")");
    svg.append("clipPath")
        .attr("id", "clip")
        .append("rect")
        .attr("width", width - 60)
        .attr("height", height);

    svg.append("rect")
        .attr("width", width - 60)
        .attr("height", height)
        .attr("class", "zoomOverlay")
        .call(drag);

    svg.append("rect")
        .attr("width", 0)
        .attr("height", 0)
        .attr("x", 0)
        .attr("y", 0)
        .attr("class", "band");

    drag.on("end", function () {
        var pos = d3.mouse(this);
        var x1 = x.invert(bandPos[0]);
        var x2 = x.invert(pos[0]);

        if (x1 < x2) {
            zoomArea.x1 = x1;
            zoomArea.x2 = x2;
        } else {
            zoomArea.x1 = x2;
            zoomArea.x2 = x1;
        }

        var y1 = y.invert(pos[1]);
        var y2 = y.invert(bandPos[1]);

        if (x1 < x2) {
            zoomArea.y1 = y1;
            zoomArea.y2 = y2;
        } else {
            zoomArea.y1 = y2;
            zoomArea.y2 = y1;
        }

        bandPos = [-1, -1];

        d3.select(".band").transition()
            .attr("width", 0)
            .attr("height", 0)
            .attr("x", bandPos[0])
            .attr("y", bandPos[1]);

        zoom();

    });

    drag.on("drag", function () {
        var pos = d3.mouse(this);

        if (pos[0] < bandPos[0]) {
            d3.select(".band")
                .attr("transform", "translate(" + (pos[0]) + "," + bandPos[1] + ")");
        }
        if (pos[1] < bandPos[1]) {
            d3.select(".band")
                .attr("transform", "translate(" + (pos[0]) + "," + pos[1] + ")");
        }
        if (pos[1] < bandPos[1] && pos[0] > bandPos[0]) {
            d3.select(".band")
                .attr("transform", "translate(" + (bandPos[0]) + "," + pos[1] + ")");
        }

        //set new position of band when user initializes drag
        if (bandPos[0] === -1) {
            bandPos = pos;
            d3.select(".band").attr("transform", "translate(" + bandPos[0] + "," + bandPos[1] + ")");
        }

        d3.select(".band").transition().duration(1)
            .attr("width", Math.abs(bandPos[0] - pos[0]))
            .attr("height", Math.abs(bandPos[1] - pos[1]));
    });

    function zoom() {

        //recalculate domains
        if (zoomArea.x1 > zoomArea.x2) {
            x.domain([zoomArea.x2, zoomArea.x1]);
            x.domain([new Date(moment(zoomArea.x2).format('DD MMM YYYY')), new Date(moment(zoomArea.x1).format('DD MMM YYYY'))]);
        } else {
            x.domain([new Date(moment(zoomArea.x1).format('DD MMM YYYY')), new Date(moment(zoomArea.x2).format('DD MMM YYYY'))]);
        }

        if (zoomArea.y1 > zoomArea.y2) {
            y.domain([zoomArea.y2, zoomArea.y1]);
        } else {
            y.domain([zoomArea.y1, zoomArea.y2]);
        }

        //update axis and redraw lines
        var t = svg.transition().duration(750);
        t.select(".x-axis").call(d3.axisBottom(x)
            .ticks(d3.timeDay, 1)
            .tickPadding(5)
            .tickSize(5)
            .tickFormat(d3.timeFormat(plotFormat)));
        t.select(".y-axis").call(d3.axisLeft(y)
            .tickFormat(d3.format('.0f'))
            .ticks(numberOfTicks));
        t.selectAll(".line1").attr("d", valueline);
        t.selectAll(".line2").attr("d", valueline2);

        rectPoints
            .transition().duration(750)
            .attr("x", function (d) { return x(new Date(moment(d.date).format('DD MMM YYYY'))) - 5 })
            .attr("y", function (d) { return y(d.customersJoined) - 5 });
        dotPoints
            .transition().duration(750)
            .attr("x", function (d) { return x(new Date(moment(d.date).format('DD MMM YYYY'))) - 2 })
            .attr("y", function (d) { return y(d.customersLeft) - 3.5 });

    }

    zoomArea = {
        x1: xDomainMin,
        y1: yDomainMin,
        x2: xDomain,
        y2: yDomain
    };

    var tooltip = d3.select('.lineChart_tooltip').style('display', 'none').style('opacity', 0);
    var noDataOverlay = d3.select('.noData-overlay')
        .style('display', 'none').style('opacity', 0);


    const customersJoinedArray = [];
    const customersLeftArray = [];
    let totalcustomersJoined = 0;
    let totalApplicationAffected = 0;
    // format the data
    data.forEach(function (d) {
        d.date = new Date(d.date);
        d.customersJoined = +d.customersJoined;
        d.customersLeft = +d.customersLeft;
        customersJoinedArray.push(d.customersJoined);
        customersLeftArray.push(d.customersLeft);
        totalcustomersJoined = totalcustomersJoined + d.customersJoined;
        totalApplicationAffected = totalApplicationAffected + d.customersLeft;
    });
    const totalPlotPoints = customersJoinedArray.length;
    let plotFormat = "%d %b %y";
    const numberOfTicks = Math.min(
        Math.max(Math.max(...customersJoinedArray), Math.max(...customersLeftArray)), 5);

    if (totalcustomersJoined === 0 && totalApplicationAffected === 0) {
        noDataOverlay.style('display', 'block').style('opacity', 0.5);
    }
    if (totalPlotPoints > 10) {
        plotFormat = "%d";
    } else {
        plotFormat = "%d %b %y";
    }

    // Scale the range of the data
    x.domain(d3.extent(data, function (d) { return new Date(moment(d.date).format('DD MMM YYYY')); }));
    y.domain([0, d3.max(data, function (d) {
        return Math.max(d.customersJoined, d.customersLeft);
    })]);


    // Add the first line path.
    svg.append("path")
        .attr("clip-path", "url(#clip)")
        .data([data])
        .attr('class', 'line1')
        .style("fill", "none")
        .style("stroke", "#819e7e")
        .style("stroke-width", "2px")
        .attr("d", valueline)
        .attr("width", 856);

    // Add the second line path.
    svg.append("path")
        .attr("clip-path", "url(#clip)")
        .data([data])
        .attr('class', 'line2')
        .style("fill", "none")
        .style("stroke", "#b7d48b")
        .style("stroke-width", "2px")
        .attr("d", valueline2);

    // Add the X Axis
    svg.append("g")
        .attr("class", "x-axis")
        .attr("transform", "translate(0," + height + ")")
        .attr("color", "#bcbcbc")
        .style('font-family', "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif")
        .call(d3.axisBottom(x)
            .ticks(d3.timeDay, 1)
            .tickPadding(5)
            .tickSize(5)
            .tickFormat(d3.timeFormat(plotFormat)));

    // Add the Y Axis
    svg.append("g")
        .attr("class", "y-axis")
        .attr("color", "#bcbcbc")
        .style('font-family', "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif")
        .call(d3.axisLeft(y)
            .tickFormat(d3.format('.0f'))
            .ticks(numberOfTicks));

    // Add label for x-axis
    svg.append("text")
        .attr("transform",
            "translate(" + (width / 2) + " ," +
            (height + margin.top + 20) + ")")
        .style("text-anchor", "middle")
        .style('font-family', "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif")
        .style('fill', '#bcbcbc')
        .text("Date");

    //Add label for y-axis
    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", -40)
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .style('font-family', "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif")
        .style('fill', '#bcbcbc')
        .text("Count");

    //Add rectangle pattern
    var rectPoints = svg.selectAll("g.dot")
        .data(data)
        .enter().append("rect")
        .attr("clip-path", "url(#clip)")
        .attr("width", 10)
        .attr("height", 10)
        .style("stroke-width", "0px")
        .style("fill", "#819e7e")
        //.attr("transform", "rotate(45)")
        .attr("x", function (d) { return x(new Date(moment(d.date).format('DD MMM YYYY'))) - 5 })
        .attr("y", function (d) { return y(d.customersJoined) - 5 })
        .on('mouseover.lineChart_tooltip', function (d) {

            var xPosition = d3.mouse(this)[0];
            var hoverDate = moment(new Date(x.invert(xPosition))).format("YYYY-MM-DD");

            tooltip.transition()
                .duration(100)
                .style('display', 'block')
                .style("opacity", 2)
                .style("z-index", 4)
                .style("left", (d3.event.pageX + 20) + "px")
                .style("top", (d3.event.pageY - 20) + "px");

            tooltip.html(function () {
                let customers;
                //let customerDate;
                data.forEach(function (d) {
                    let convertedDate = moment(d.date).format("YYYY-MM-DD");
                    if (convertedDate === hoverDate) {
                        //customerDate = moment(d.date).format("DD MMM YYYY");
                        customers = d.customersJoined;
                    }
                })
                return "<label class='chart-tooltip-text'>" + customers + " Customers</label> <div class='tooltip-left-arrow_box'></div>";
            })
        })
        .on("mouseout.lineChart_tooltip", function () {
            tooltip.transition()
                .duration(100)
                .style("opacity", 0)
                .style("z-index", 4);
        })
        .on("mousemove.lineChart_tooltip", function () {
            tooltip.style("left", (d3.event.pageX + 20) + "px")
                .style("top", (d3.event.pageY - 20) + "px");
        });

    //Add dot pattern
    var dotPoints = svg.selectAll("g.dot")
        .data(data)
        .enter().append("rect")
        .attr("clip-path", "url(#clip)")
        .style("fill", "#b7d48b")
        .style("stroke-width", "0px")
        .attr("width", 7)
        .attr("height", 7)
        .attr('rx', 3.5)
        .attr('ry', 3.5)
        .attr("x", function (d) { return x(new Date(moment(d.date).format('DD MMM YYYY'))) - 3 })
        .attr("y", function (d) { return y(d.customersLeft) - 3.5 })
        //.attr("r", 3)
        .on('mouseover.lineChart_tooltip', function (d) {
            var xPosition = d3.mouse(this)[0];
            var hoverDate = moment(new Date(x.invert(xPosition))).format("YYYY-MM-DD");

            tooltip.transition()
                .duration(100)
                .style('display', 'block')
                .style("opacity", 2)
                .style("z-index", 4)
                .style("left", (d3.event.pageX + 20) + "px")
                .style("top", (d3.event.pageY - 20) + "px");

            tooltip.html(function () {
                let customers;
                //let customerDate;
                data.forEach(function (d) {
                    let convertedDate = moment(d.date).format("YYYY-MM-DD");
                    if (convertedDate === hoverDate) {
                        //customerDate = moment(d.date).format("DD MMM YYYY");
                        customers = d.customersLeft;
                    }
                })
                return "<label class='chart-tooltip-text'>" + customers + " Customers</label> <div class='tooltip-left-arrow_box'></div>";
            })
        })
        .on("mouseout.lineChart_tooltip", function () {
            tooltip.transition()
                .duration(100)
                .style("opacity", 0)
                .style("z-index", 4);
        })
        .on("mousemove.lineChart_tooltip", function () {
            tooltip.style("left", (d3.event.pageX + 20) + "px")
                .style("top", (d3.event.pageY - 20) + "px");
        });
}

export { lineChartUtility }