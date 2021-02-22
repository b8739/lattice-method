
// set the dimensions and margins of the graph
let margin = {top: 10, right: 30, bottom: 30, left: 60},
    width = 600 - margin.left - margin.right,
    height = 560 - margin.top - margin.bottom;

// append the svg object to the body of the page
let svg = d3.select("#my_dataviz")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

//Read the data

  let xaxisStart = Math.round((meanKd1-300)/100)*100;
  let xaxisEnd = Math.round((meanKd1+300)/100)*100;
  let xTicksNum = (xaxisEnd-xaxisStart)/100;

  // Add X axis
  let x = d3.scaleLinear()
    .domain([xaxisStart,xaxisEnd])
    .range([0, width])
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x)
    .ticks(xTicksNum));

  let yaxisEnd = Math.round(meanKd2)+50;
  let yTicksNum = yaxisEnd/20;
  // Add Y axis
  let y = d3.scaleLinear()
    .domain([0, yaxisEnd])
    .range([ height, 0]);
  svg.append("g")
    .call(d3.axisLeft(y)
    .ticks(yTicksNum));

  // Add dots
  svg.append('g')
    .selectAll("dot")
    .data(data2)
    .enter()
    .append("circle")
      .attr("cx", function (d) { return x(d['A']); } )
      .attr("cy", function (d) { return y(d['B']); } )
      .attr("r", 1.5)
      .style("fill", "#69b3a2");
//rect
let rectWidth = d3.scaleLinear()
  .domain([0, fitToleranceX])
  .range([0, width/6/2]);

let rectHeight = d3.scaleLinear()
  .domain([0, fitToleranceY])
  .range([0, height/12]);

  svg.append('g')
    .selectAll("rect") 
    .data(sizingInfo)
    .enter()
    .append('rect') //sizingInfo.length 개수만큼의 rect가 생겨난 상황
    // 위치, 사이즈
    .attr('width',rectWidth(fitToleranceX))
    .attr('height', rectHeight(fitToleranceY))

    .attr('x',function(d){
      return x(d[0]);
    })
    .attr('y',function(d){
      return y(d[3])-rectHeight(fitToleranceY); //왼쪽 아래가 아닌 왼쪽 위에이기 때문에
    })
    // style
    .attr('stroke', 'black')
    .attr('fill', 'none');
    //data가 계속 바뀌어야되는 문제

    svg.append('g')
    .selectAll("rect") 
    .data(reducedSizingInfo)
    .enter()
    .append('rect') //sizingInfo.length 개수만큼의 rect가 생겨난 상황
    // 위치, 사이즈
    .attr('width',rectWidth(fitToleranceX))
    .attr('height', rectHeight(fitToleranceY))

    .attr('x',function(d){
      return x(d[0]);
    })
    .attr('y',function(d){
      return y(d[3])-rectHeight(fitToleranceY); //왼쪽 아래가 아닌 왼쪽 위에이기 때문에
    })
    // style
    .attr('stroke', 'red')
    .attr('stroke-width', '3px')
    .attr('fill', 'none');