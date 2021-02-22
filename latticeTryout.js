
// functions
function fillKdGroupValue(kd1Group,kd2Group,kd1Name,kd2Name){
  for (var key in data2){
    kd1Group.push(data2[key][kd1Name]);//key Dimension Name
    kd2Group.push(data2[key][kd2Name]);//key Dimension Name
  }
  return
}

// max 값 찾는 함수 선언
function getMaxValue (kdName) {
  let max = 0;
  for (var key in data2){
    kdValue = data2[key][kdName];//key Dimension Name
    if (max<kdValue){
      max = kdValue;
    }
  }
  return max;
} 

// min 값 찾는 함수 선언
function getMinValue (kdName) {
  let min = data2[0][kdName]
  for (var key in data2){
    kdValue = data2[key][kdName];//key Dimension Name
    if (min>kdValue){
      min = kdValue;
    }
  }
    return min;
} 

function getMeanValue (kdName) {
  let subTotal = 0;
  for (var key in data2){
    subTotal+= data2[key][kdName];//key Dimension Name
  }
  return subTotal/data2.length; 
}

// --functions

// 변수

let fitToleranceX = 50;
let fitToleranceY = 10;
let targetAccomRatio = 95;
let minPopCoverageRatio = 2;
let kd1Group = new Array;
let kd2Group =new Array;
let kd1Name = 'A';
let kd2Name = 'B';

let data2 = [];
for(let i = 0; i<800;i++){
  tempJson = {};
  var randomValue = Math.random() * (1900-1500)+1500;
  tempJson['A'] = randomValue;
  var randomValue = Math.random() * (100-40)+40;
  tempJson['B'] = randomValue;
  data2.push(tempJson);
}

for (let value in data2){
  kd1Group.push(data2[value][kd1Name]);
  kd2Group.push(data2[value][kd2Name]);
}

let numPopulation = data2.length; // 값 count해서 넣어야 함





let maxKd1 = 0;
let maxKd2 = 0;

let minKd1 = 0;
let minKd2 = 0;

let meanKd1 = 0;
let meanKd2 = 0;

// kd 각각 max 값 찾아서 변수에 할당
maxKd1 = getMaxValue(kd1Name);
maxKd2 = getMaxValue(kd2Name);

minKd1 = getMinValue(kd1Name);
minKd2 = getMinValue(kd2Name);

meanKd1 = getMeanValue(kd1Name);
meanKd2 = getMeanValue(kd2Name);

const rangeX = maxKd1 - minKd1;
const rangeY = maxKd2 - minKd2;

const numGridsX = Math.round(rangeX/fitToleranceX);
const numGridsY = Math.round(rangeY/fitToleranceY);

//lower bounds
const LB_X = Math.round(meanKd1 - numGridsX/2*fitToleranceX); //이 부분 교수님께 여쭤볼것
const LB_Y = Math.round(meanKd2 - numGridsY/2*fitToleranceY);

let row = 0;
let sizingInfo = new Array();

for (i = 0; i<numGridsX; i++){
  for(j = 0; j<numGridsY; j++){
    sizingInfo[row]= new Array(8)
    sizingInfo[row][0] = LB_X + i*fitToleranceX;
    sizingInfo[row][1] = sizingInfo[row][0] + fitToleranceX/2;
    sizingInfo[row][2] = sizingInfo[row][0] + fitToleranceX;
    sizingInfo[row][3] = LB_Y + j*fitToleranceY;
    sizingInfo[row][4] = sizingInfo[row][3]  + fitToleranceY/2;
    sizingInfo[row][5] = sizingInfo[row][3]  + fitToleranceY;
    row++;
  }    
}

const numSizeCategories = numGridsX*numGridsY;

// count how many cases are included in each sizing category
let cntCasesInEachSizes = new Array(numSizeCategories);
cntCasesInEachSizes.fill(0);

for (let i =0; i<=numPopulation;i++){ 
    for (let j =0; j<numSizeCategories;j++){
    if (kd1Group[i] >= sizingInfo[j][0] && kd1Group[i] <= sizingInfo[j][2] 
      && kd2Group[i] >= sizingInfo[j][3] && kd2Group[i] <= sizingInfo[j][5])
          cntCasesInEachSizes[j]++;
  }
}

for (let i =0; i<numSizeCategories;i++){ //끝값
  sizingInfo[i][6] = cntCasesInEachSizes[i];
  sizingInfo[i][7] = sizingInfo[i][6]/numPopulation * 100; 
}

row = 0;
let numSizeCategory = new Array;
for (let i =0; i<numSizeCategories;i++){
    if (sizingInfo[i][7] > minPopCoverageRatio) { //minpopcoverageratio는 뭔지?
      numSizeCategory[row]= new Array(1);
      numSizeCategory[row][0] = i;
      row++;
    }

}

let numSizeCategoriesFilled = numSizeCategory.length;

reducedSizingInfo = new Array;

for (let i =0; i<numSizeCategoriesFilled;i++){ 
  reducedSizingInfo[i] = new Array;
    for (let j = 0; j<=7;j++){
      reducedSizingInfo[i][j] = sizingInfo[numSizeCategory[i]][j];
    }
}

//그리기








