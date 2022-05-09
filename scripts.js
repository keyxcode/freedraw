document.addEventListener("DOMContentLoaded", () => {

    // Select the canvas
    const svg = d3.select('#svg');
    // Set drawing boolean logic, default color, width
    let drawing = false;
    let color = document.querySelector("#color").value;
    let width = document.querySelector("#width").value;
    // Set point array to store the pair of points to be connected as a line
    let pointArray = [];

    // Switch color on change
    document.querySelector("#color").onchange = () => {
        color = document.querySelector("#color").value;   
    }

    // Switch width on change
    document.querySelector("#width").onchange = () => {
        width = document.querySelector("#width").value;   
    }

    // Drawing logic
    function draw_point() {

        // If mouse not down => not draw
        if (!drawing)
            return;
        
        // Get the current mouse coordinate
        const coords = d3.mouse(this); 

        // Draw a point (circle) on function call
        svg.append('circle')
            .attr('cx', coords[0])
            .attr('cy', coords[1])
            .attr('r', width)
            .style('fill', color);

        // If there was a previous point, connect that and the current point
        if (pointArray.length > 0) {
            
            // Get the previous point in the array and pop it
            lastPoint = pointArray.pop();

            // Connect the current point and the previous point
            // Line width has to x 2 because width is for point radius
            svg.append("line")
                .attr("x1", lastPoint[0])
                .attr("y1", lastPoint[1])
                .attr("x2", coords[0])
                .attr("y2", coords[1])
                .style("stroke-width", String(Number(width) * 2))
                .style("stroke", color);

            // // DEBUG
            // console.log("[Last point: " + lastPoint);
            // console.log("Current point: " + coords + "]");
        }

        // Add the point just drawn to the point array
        pointArray.push(coords);
    };

    // Detect mouse states
    svg.on('mousedown', () => {
        drawing = true;
    });
    svg.on('mouseup', () => {
        drawing = false;
        // So that the points don't connect after mouse has been released
        pointArray = [];
    });
    svg.on('mousemove', draw_point);

    // If erase button is pressed, erase everything
    document.querySelector("#erase").onclick = () => {
        d3.select("#svg").selectAll("*").remove();
    }

})

