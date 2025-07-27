import{data , datahours}from '../javascript/data.js'
console.log(' 2.button save in second page le photo');
document.querySelector('.the-day').innerHTML=dayjs().format('dddd MMM,D');
/******************transition between pages************************/
document.querySelector('.log-container').classList.add('displaychange');
document.querySelector('.log-container2').classList.add('displaychange');
document.querySelector('.log-container3').classList.add('displaychange');

/*first display (log in)*/
document.querySelector('.button-log').addEventListener('click',()=>{
 document.querySelector('.main-page-2').classList.add('main-page-absolute');
 document.querySelector('.log-container').classList.remove('displaychange');
});
/*move to the second page*/
document.querySelector('.continue1').addEventListener('click',()=>{
document.querySelector('.log-container').classList.add('displaychange');
 document.querySelector('.log-container2').classList.remove('displaychange');
})
/*comeback to the first page***/
document.querySelector('.comeback2').addEventListener('click',()=>{
document.querySelector('.log-container2').classList.add('displaychange');
 document.querySelector('.log-container').classList.remove('displaychange');
})
/*move to the third page*/
document.querySelector('.continue2').addEventListener('click',()=>{
document.querySelector('.log-container2').classList.add('displaychange');
 document.querySelector('.log-container3').classList.remove('displaychange');
});
/*comback to the second page*/
document.querySelector('.comeback3').addEventListener('click',()=>{
document.querySelector('.log-container3').classList.add('displaychange');
 document.querySelector('.log-container2').classList.remove('displaychange');
});
/*save the results*/
document.querySelector('.save').addEventListener('click',()=>{
document.querySelector('.log-container3').classList.add('displaychange');
document.querySelector('.main-page-2').classList.remove('main-page-absolute');
});

/*profile image***********************/
const input = document.getElementById('profile-image');
  const preview = document.getElementById('profile-preview');

  input.addEventListener('change', function () {
    const file = this.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = function () {
        preview.src = reader.result;
      };

      reader.readAsDataURL(file);
    }
  });
  /************************* */
 let userName = JSON.parse(localStorage.getItem('userName')) || '';

document.querySelector('.name').innerHTML = `
  <input type="text" class="name-input" value="${userName}" maxlength="15" style="font-size: x-small;">
`;

document.querySelector('.hello').innerHTML = `Hello ${userName}!`;

document.querySelector('.name-input').addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    const newName = document.querySelector('.name-input').value.trim();
    localStorage.setItem('userName', JSON.stringify(newName));
    document.querySelector('.hello').innerHTML = `Hello ${newName}!`;
  }
});

/************************************************* */
/**********DDDDDDDAAAAATAAAA */
/********************Preparation for the second page***********************/
let nSelected;
for (let i=0;i<=6;i++){
document.querySelector(`.day-${i}`).addEventListener('click',()=>{
   nSelected=i;
   localStorage.setItem('nSelected',JSON.stringify(nSelected));
});
};
/************************************ */
let inputTab=JSON.parse(localStorage.getItem('inputTab'));
let inputTab2=[];
let daystab=[];

let day;

let defaultSet=0;

//get today 
let  today=dayjs();
 localStorage.setItem('today',JSON.stringify(today));
let todayinfo={
  day:today,

};

// Get the stored day or set a new one if invalid/expired

function newWeek(){
day=dayjs();
  localStorage.setItem('firstday',JSON.stringify(day));
  /*******  NEW CHAPTER****************/
  inputTab=[];
  inputTab2=[];
   alert(`Note✨: if the day pass and you did not fill your mood and sleep hours ,they will automatically set to 'neutral' and '6-8 Hours' 
                                            Thank u 😊🌼`);
  for(let i=0;i<=6;i++){
  localStorage.removeItem(`${i}`);
  localStorage.removeItem(`msg-${i}`);
  localStorage.removeItem(`progress-${nSelected}`);
  localStorage.removeItem('done');

  };
  localStorage.setItem('inputTab',JSON.stringify(inputTab));
}
  /********************************** */
 day = localStorage.getItem('firstday');
day = day ? dayjs(JSON.parse(day)) : null;
console.log(day);
if((!day)|| day.add(6,'days').isBefore(dayjs())){
 newWeek(); 
}
/*******set a new week******************* */
document.querySelector('.new-week-button').addEventListener('click',()=>{
  localStorage.removeItem('firstday');
  location.reload();
})
//--------------------------------------

//generate the days array
for(let i=0;i<=6;i++){
  let dayformat=day.add(i,'days');
  //put the day array in the page;
  document.querySelector(`.day-${i}`).innerHTML=`${dayformat.format('dddd')}<br>${dayformat.format('MMM, D')}`;
  //convert the format of the daytab//
 localStorage.setItem('daystab',JSON.stringify(dayformat));
 daystab.push(localStorage.getItem('daystab'))
};
console.log('daays',daystab[0]);

//generate the day information----------------------------


//-------------------------

// Add this function to calculate average mood
function calculateAverageMood() {
  if (!inputTab || inputTab.length === 0) return "neutral"; // Default if no data

  // Assign numerical values to each mood
  const moodValues = {
    'very-happy': 5,
    'happy': 4,
    'neutral': 3,
    'sad': 2,
    'very-sad': 1
  };

  // Calculate total mood value for the week
  let total = 0;
  let i=0;
  while(i< inputTab.length){
    total += moodValues[inputTab[i].mood] ; 
    i++;}

  // Calculate average
    const average = (total +(defaultSet*3))/ (inputTab.length+defaultSet);

  // Convert back to mood category
  if (average >= 4.5) return 'very-happy';
  if (average >= 3.5) return 'happy';
  if (average >= 2.5) return 'neutral';
  if (average >= 1.5) return  'sad';
  return 'very-sad';
};

// Add this function to calculate average sleep
function calculateAverageSleep() {
  if (!inputTab || inputTab.length === 0) return "6-8 Hours"; // Default if no data

  // Assign numerical values to each mood
  const sleepValues = {
   '0-2':2,
   '2-4':4,
   '4-6':6,
   '6-8':8,
   'b-8':10,
};

  // Calculate total mood value for the week
  let total = 0;
  let i=0;
  while(i< inputTab.length){
    total += sleepValues[inputTab[i].sleepTime] ; 
    i++;}

  // Calculate average
  console.log(inputTab);
  console.log(total);
  console.log(inputTab.length);
  const average = (total +(defaultSet*8))/ (inputTab.length+defaultSet);

  // Convert back to mood category
  if (average > 8) return "more then 8 Hours";
  if (average > 6) return "6-8 Hours";
  if (average > 4) return "4-6 Hours";
  if (average > 2) return "2-4 Hours";
  return "0-2 Hours";
};

//generate msg for the average sleep
 function msgAverageSleep(hours){
  datahours.forEach((elem)=>{
    if (elem.hours===hours){
      document.querySelector('.msgAverageSleep').innerHTML=elem.msgAverageSleep;
    }
  })
}

//generate msg for the average mood

function msgAverageMood(mood){
  data.forEach((elem)=>{
    console.log(elem.mood);
    console.log(mood);
    if(elem.mood===mood){
       document.querySelector('.msgAverageMood').innerHTML=elem.msgAverageMood;
    }
  })
}

 
 /*function generate the Columns*/
function generateColumn(array,classi,info){
 let element=document.querySelector(`.d${classi}`);
 let hours=array[info].sleepTime;
 let mood=array[info].mood;
 element.classList.add(`hours${hours}`);
 element.classList.add(`${mood}-color`);
};

/*function  generateDefaultColumn*/
function generateDefaultColumn(index){
 let element=document.querySelector(`.d${index}`);
 console.log(`d${index}`);
 element.classList.add(`hours6-8`);
  element.classList.add(`neutral-color`); 
}

function diffDays(){
  let stop=false;
  let i=0;
  let d2=dayjs().format('D');
  while (!stop &&i<=6){
    let d1=day.add(i,'days').format('D');
    if (d1==d2){stop=true;}
     else{i++;}
  }
  return (i);
}

//function return true if two days are the same
function similarDays(dayD,day){
for(let i=0;i<=10;i++){
  if(dayD[i+1]!=day[i]){
    return false;
  }
}
return true;
}

// function to generate the whole graph//
function generateGraph() {
  let j = 0;
 today=JSON.parse(localStorage.getItem('today'));
  for (let i = 0; i <=diffDays(); i++) {
    console.log('today',today);
    console.log('daystab',daystab[i]);
    console.log(similarDays(daystab[i],today));
  if (inputTab[j] === undefined && similarDays(daystab[i],today)){
    console.log('the user did not enter the info yet');

  }else{
    if (inputTab[j] === undefined ||(!similarDays(daystab[i],inputTab[j].day))) {
   
        inputTab2[i]={
          mood:'neutral',
          sleepTime:'6-8',
        };
        generateDefaultColumn(i);
        defaultSet++;
        let inputday=inputTab[j];
    }
    else {
      // Compare dates using isSame() with 'day' granularity
        inputTab2[i]=inputTab[j];
        generateColumn(inputTab, i,j);  // Note: changed i to j here
        j++;
     
    }};
  }
  let sleep=calculateAverageSleep();
  let mood=calculateAverageMood();
  localStorage.setItem('inputTab2',JSON.stringify(inputTab2));
  document.querySelector('.a-mood').innerHTML=mood;
  localStorage.setItem('a-mood',JSON.stringify(mood));
  document.querySelector('.a-sleep').innerHTML=sleep;
   localStorage.setItem('a-sleep',JSON.stringify(sleep));
   msgAverageSleep(sleep);
   msgAverageMood(mood);
   
}

generateGraph();

/*******************get the user info*******************/
let moods=['very-happy','happy','neutral','sad','very-sad'];



let a=todayinfo.day;
console.log('hii',a);

//choose the mood
function generateMood(){
for (let i=0;i<=4;i++){
document.querySelector(`#${moods[i]}`).addEventListener('click',()=>{
todayinfo.mood=moods[i];
console.log(todayinfo);
});
}
};

//choose the sleep hours
function generateSleepHours(){
document.querySelectorAll('input[name="sleep"]').forEach((choice)=>{
  choice.addEventListener('click',()=>{
    todayinfo.sleepTime=choice.dataset.sleepHours;
  });
})
};

//generate the gift msg
function generateMsg(info){
data.forEach((elem)=>{
  if(elem.mood===info.mood){
    document.querySelector('.mood-message').innerHTML=`<span>${elem.msg}</span>`;
    document.querySelector('.mood-gif').innerHTML=
    `<img src=${elem.img} alt="smile!" class="msg-img"img>`
  
  }
})
};
///->put the msg in the page
document.querySelector('.continue2').addEventListener('click',()=>{
   generateMsg(todayinfo);}
  );

let done= JSON.parse(localStorage.getItem('done'));
if (!done){done='';}
///////final function 
function generateLogChart(){
document.querySelector('.button-log').addEventListener('click',()=>{
alert("🌸 Please pick your mood and sleep hours 💤 so we can save your day perfectly! 🌈✨");

generateMood();
generateSleepHours();
});
document.querySelector('.save').addEventListener('click',()=>{
  
  if(todayinfo.mood!=undefined && todayinfo.sleepTime!=undefined){
    //1.save data in the array
  inputTab.push(todayinfo);
  localStorage.setItem('inputTab',JSON.stringify(inputTab));
  inputTab=JSON.parse(localStorage.getItem('inputTab'));
  generateGraph();
  console.log('array',inputTab);
  document.querySelector('.b').innerHTML='<p>Thank you for sharing your mood today! 😊</p>'
  done= today;
  localStorage.setItem('done',JSON.stringify(done));
  done= JSON.parse(localStorage.getItem('done'));
  };
})
};
// Check if mood was already logged today

// If nothing was logged before OR if logged date is different from today

if (done[8]!=today[8] || done[9]!=today[9]) {
    generateLogChart(); // Load chart if already logged today
    
} else {
     // Show thank you message
    document.querySelector('.b').innerHTML = '<p>Thank you for sharing your mood today! 😊</p>';
}