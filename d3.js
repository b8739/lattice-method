
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
let xAdjustRangeMinus = setAdjustRangeMinus(minKd1);
let xAdjustRangePlus = setAdjustRangePlus(maxKd1);

let xaxisStart = Math.round((minKd1-xAdjustRangeMinus)/xAdjustRangeMinus)*xAdjustRangeMinus;
let xaxisEnd = Math.round((maxKd1+xAdjustRangePlus)/xAdjustRangePlus)*xAdjustRangePlus;
let xTicksNum = (xaxisEnd-xaxisStart)/xAdjustRangePlus;

// Add X axis
let x = d3.scaleLinear()
  .domain([xaxisStart,xaxisEnd])
  .range([0, width])
  
svg.append("g")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(x)
  .ticks(xTicksNum));

yAdjustRangeMinus = setAdjustRangeMinus(minKd2);
yAdjustRangePlus = setAdjustRangePlus(maxKd2);

let yaxisStart = Math.round((minKd2-yAdjustRangeMinus)/yAdjustRangeMinus)*yAdjustRangeMinus;
let yaxisEnd = Math.round((maxKd2+yAdjustRangePlus)/yAdjustRangePlus)*yAdjustRangePlus;
let yTicksNum = (yaxisEnd-yaxisStart)/yAdjustRangePlus;

// Add Y axis
let y = d3.scaleLinear()
  .domain([yaxisStart, yaxisEnd])
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
.domain([0, xAdjustRangePlus]) //0 - 100
.range([0, width/xTicksNum]); 

let rectHeight = d3.scaleLinear()
.domain([0, yAdjustRangePlus])
.range([0, height/yTicksNum]);

svg.append('g')
  .selectAll("rect") 
  .data(sizingInfo)
  .enter()
  .append('rect') //sizingInfo.length 개수만큼의 rect가 생겨난 상황
  .attr('width',rectWidth(fitToleranceX))
  .attr('height', rectHeight(fitToleranceY))
  .attr('x',function(d){
    return x(d[0]);
  })
  .attr('y',function(d){
    return y(d[3])-rectHeight(fitToleranceY); //왼쪽 아래가 아닌 왼쪽 위에이기 때문에
  })

  .attr('stroke', 'black')
  .attr('fill', 'none');

  //Filled
  // svg.append('g')
  // .selectAll("rect") 
  // .data(reducedSizingInfo)
  // .enter()
  // .append('rect') //sizingInfo.length 개수만큼의 rect가 생겨난 상황
  // // 위치, 사이즈
  // .attr('width',rectWidth(fitToleranceX))
  // .attr('height', rectHeight(fitToleranceY))

  // .attr('x',function(d){
  //   return x(d[0]);
  // })
  // .attr('y',function(d){
  //   return y(d[3])-rectHeight(fitToleranceY); //왼쪽 아래가 아닌 왼쪽 위에이기 때문에
  // })
  // // style
  // .attr('stroke', 'red')
  // .attr('stroke-width', '3px')
  // .attr('fill', 'none');








  // function
  function setAdjustRangeMinus(minKd){
    let adjustRangeMinus;
    if(10<minKd && minKd<100){
      adjustRangeMinus = 10;
    }
    else if (100<minKd && minKd<1000){
      adjustRangeMinus = 100;
    }
    else if (1000<minKd && minKd<10000){
      adjustRangeMinus = 100;
    }
    else{
      adjustRangeMinus = 0
    }
    return adjustRangeMinus;
  }
  
  function setAdjustRangePlus(maxKd){
    let adjustRangePlus;
    if(10<maxKd && maxKd<100){
      adjustRangePlus = 10;
    }
    else if (100<maxKd && maxKd<1000){
      adjustRangePlus = 100;
    }
    else if (1000<maxKd && maxKd<10000){
      adjustRangePlus = 100;
    }
    else{
      adjustRangePlus = 10;
    }
    return adjustRangePlus;
  }