 import{data , datahours}from '../javascript/data.js'
 let feelinghtml=`
<div class="feeling">
                    <div class="imogie-container">
                    </div>
                    <div class="statics-container">
                  </div>
                </div>`
let feelinghtmlflex=`
                <div class="feeling">
                    <div class="imogie-container">
                    </div>
                </div>`
 let staticshtml=
`<fieldset class="statics">
                 <!-- Inside your statics fieldset (replace the empty fieldset) -->
                      <div class="progress-tracker">
                        <h3 style="margin: 0; color: white;">Daily Progress</h3>
                        <div class="progress-metrics">
                          <div class="metric-box">
                            <div class="metric-value" id="total-tasks">0</div>
                            <div class="metric-label">Total Tasks</div>
                          </div>
                          <div class="metric-box">
                            <div class="metric-value" id="completed-tasks">0</div>
                            <div class="metric-label">Completed</div>
                          </div>
                          <div class="metric-box">
                            <div class="metric-value" id="completion-rate">0%</div>
                            <div class="metric-label">Done</div>
                          </div>
                        </div>
                        <div class="progress-bar-container">
                          <div class="progress-bar" id="progress-bar"></div>
                        </div>
                      </div>
               </fieldset>`
 function updatePosition() {
  let flexF=document.querySelector('.feeling-container-flex');
  let flexS=document.querySelector('.statics-container-flex');
  let Fs=document.querySelector('.feeling-container');
  flexF.innerHTML='';
  flexS.innerHTML='';
  Fs.innerHTML='';
 let done=false;
            if(window.innerWidth >= 1000) {
              
                Fs.innerHTML = feelinghtml;
                document.querySelector('.statics-container').innerHTML=staticshtml;
                done=true;
                
            } else {
                if (done){
                  Ss.innerHTML='';
                  done=false;            }
               flexF.innerHTML = feelinghtmlflex;
                flexS.innerHTML=staticshtml; 
            }
        }
updatePosition();
// Update on resize
window.addEventListener('resize', function() {
  updatePosition();
  generatePage2();

});
/***************base modifications******************************************* */
//get primary data
//generate msg for the average sleep
/////////////////NEDDED FUNCTIONS//////////////////////////////////
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
//////////////////////////////////////////////////////////////
let nSelected=JSON.parse(localStorage.getItem('nSelected'));
let inputTab2=JSON.parse(localStorage.getItem('inputTab2'));
let averageSleep=JSON.parse(localStorage.getItem('a-sleep'));
let averageMood=JSON.parse(localStorage.getItem('a-mood'));
//put the data from page1 inside  page2///////////

function generatePage2(){
  if(inputTab2[nSelected]===undefined){
document.querySelector('.a-mood').innerHTML=averageMood;
msgAverageMood(averageMood);
document.querySelector('.a-sleep').innerHTML=averageSleep;
msgAverageSleep(averageSleep);
  document.querySelector('.hoursfield').innerHTML=`Undefined`;
  document.querySelector('.imogie-container').innerHTML=`
  <img src="../img/Undefined.png" alt="Undefined" class="imogie-photo">
  <p class="feeling-text"> undefined ! </p>
  <p class="msg">Thank You! for sharing your emotions 🌈✨🌞</p>
  `;

  }
  else{
  document.querySelector('.a-mood').innerHTML=averageMood;
  msgAverageMood(averageMood);
  document.querySelector('.a-sleep').innerHTML=averageSleep;
  msgAverageSleep(averageSleep);
  document.querySelector('.hoursfield').innerHTML=`${inputTab2[nSelected].sleepTime} Hours`;
  document.querySelector('.imogie-container').innerHTML=`
  <img src="../img/${inputTab2[nSelected].mood}.png" alt="${inputTab2[nSelected].mood} " class="imogie-photo">
  <p class="feeling-text">I am feeling ${inputTab2[nSelected].mood} ! </p>
  <p class="msg">Thank You! for sharing your emotions 🌈✨🌞</p>
  `;

   document.querySelector('.save-input').classList.add(`${inputTab2[nSelected].mood}-color`);

   document.querySelector(`.todolist`).classList.add(`${inputTab2[nSelected].mood}-shadow`);

   document.querySelector('.statics').classList
   .add(`${inputTab2[nSelected].mood}-color`);
}
}
generatePage2();

/**************************Save-Gnererate the nex data***************************/

/*To do list*/
let todo=JSON.parse(localStorage.getItem(`${nSelected}`));;
if(!todo){
  todo=[];
}
let progress=JSON.parse(localStorage.getItem(`progress-${nSelected}`));
if (!progress){
  progress=[];
}

/*Calculate**************/
function CalculateP(){
  let total=progress.length;
  let completed=0;
  let done;
  if (total===0){done=0;}else{
  progress.forEach((elem)=>{
    if (elem==='done'){
      completed++;
    }
  });
  done=(completed*100/total).toFixed(1);};
  document.querySelector('#total-tasks').innerHTML=total;
  document.querySelector('#completed-tasks').innerHTML=completed;
  document.querySelector('#completion-rate').innerHTML=`${done}%`;
  document.querySelector('.progress-bar').style.width=`${done}%`;
}

/*********Evaluate the progress */
function evaluteProgress(){
todo.forEach((elem,index)=>{
  console.log(index);
document.querySelector(`#c-${index}`).addEventListener('change',()=>{
  if(progress[index]!='done'){
alert('🌟 Great job!');
progress[index]='done';

console.log('progress',progress);}
else{
 progress[index]='not-done';
}
 localStorage.setItem(`progress-${nSelected}`,JSON.stringify(progress));
 CalculateP();
})
})
}

/***Display********** */
function displayToDo(){
  let list=document.querySelector('.todolist-area');
  list.innerHTML='';
  let index=0;
  todo.forEach((action)=>{
  if (progress[index]==='not-done' || progress[index]===undefined){
    progress[index]='not-done';
    console.log(progress);
  list.innerHTML+= `<input type="checkbox" name="${index}" id="c-${index}" class="input-check"><button class="delete">❌</button>
  <label for="c-${index}"  style="" class="work"> ${action}</label>
  <br>`
  }
  else{
   list.innerHTML+= `<input type="checkbox" name="${index}" id="c-${index}" class="input-check" checked><button class="delete" data-number="c-${index}">❌</button>
  <label for="c-${index}"  > ${action}</label>
  <br>` 
    }
    index++;
  });
  // Add event listeners to all delete buttons
  document.querySelectorAll('.delete').forEach((button,index )=> {
    button.addEventListener('click' ,()=> {
      todo.splice(index, 1);
      localStorage.setItem(`${nSelected}`,JSON.stringify(todo));
      progress.splice(index, 1);
      displayToDo();
    });
  });
  evaluteProgress();
  CalculateP();
}
 displayToDo();
 /****************** */
/*---generte----*/
document.querySelector('.save-input').addEventListener('click',()=>{
 todo.push(document.querySelector('.todolist-input').value);
 displayToDo();
});
/*---generte----*/
document.querySelector('.todolist-input').addEventListener('keydown', (event) => {
  if (event.key === 'Enter') { 
    todo.push(document.querySelector('.todolist-input').value);
    localStorage.setItem(`${nSelected}`,JSON.stringify(todo));
    displayToDo();
  }
});


