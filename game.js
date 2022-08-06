function slotMachine(){  
    /*Degiskenler*/
  var machine = document.querySelector('.machine');
  var slotMac1 = document.querySelector('.slot-machine1');
  var slotMac2 = document.querySelector('.slot-machine2');
  var slotMac3 = document.querySelector('.slot-machine3');
  var leverBall = document.querySelector('#lever-ball');  
  var leverBar = document.querySelector('#lever-bar');  
  var wisText = document.querySelector('.wis-txt');
  var gameCount = 2;
  var items = [],
      winRates = [],
      totalWRates = 0;
  
  var degree1 = '36deg',
      degree2 = '72deg',
      degree3 = '108deg';
  
    var root = document.querySelector(':root');
    var paneSize = 150;
    var xAngle1,
        xAngle2,
        xAngle3;
  
    /*Degiskenler*/    
  
    /*Kampanyadan bu şekilde gelecek veriler.*/
    var oc5 ='https://raw.githubusercontent.com/ktoqaloglu/Slot-Machine/master/200x200.png,10,https://raw.githubusercontent.com/ktoqaloglu/Slot-Machine/master/200x200.png,5,https://raw.githubusercontent.com/ktoqaloglu/Slot-Machine/master/200x200.png,10,https://raw.githubusercontent.com/ktoqaloglu/Slot-Machine/master/200x200.png,20';
        totalObj = oc5.split(','),
        spliterC = 0;
    var counterDislpay = document.querySelector('#counter-display');
  /*Hesap Fonksiyonları*/
  
  function compare(value1, operator, value2) {
  switch (operator) {
      case '>':   return value1 > value2;
      case '<':   return value1 < value2;
      case '>=':  return value1 >= value2;
      case '<=':  return value1 <= value2;
      case '==':  return value1 == value2;
      case '!=':  return value1 != value2;
      case '===': return value1 === value2;
      case '!==': return value1 !== value2;
  }
  }
  
  function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
  }
  var rnd = randomInt(0,100);
  
  function init(){
  
  
    for (let index = 0; index < totalObj.length; index++) {
      if(index %2 == 0){
        items[spliterC] = totalObj[index];
      }else{
              winRates[spliterC] = totalObj[index];
              spliterC++;
              totalWRates += parseInt(totalObj[index]);
      }
    }
  
    for (let index = 0; index < winRates.length; index++) {
          if(index == 0){
        winRates[index] =parseInt(winRates[index]);  
      }else{
          winRates[index] = parseInt(winRates[index-1]) + parseInt(winRates[index]);
      }
      }
  
    for (let index = 0; index < items.length; index++) {
      slotMac1.insertAdjacentHTML('beforeend',`
      <li class="slot1_item"><img class="image_item" src='`+items[index]+`'/><span class='item_span'">`+index+`</span></li>
      `);
      slotMac2.insertAdjacentHTML('beforeend',`
      <li class="slot2_item"><img class="image_item" src='`+items[index]+`'/><span class='item_span'">`+index+`</span></li>
      `);
      slotMac3.insertAdjacentHTML('beforeend',`
      <li class="slot3_item"><img class="image_item" src='`+items[index]+`'/><span class='item_span'">`+index+`</span></li>
      `);
    }
    counterDislpay.textContent = gameCount;
  }
  
  
  function slot1Spin(){
    root.style.setProperty('--slot1Rotate',degree1);
    var panes1 = document.querySelectorAll(".slot1_item"),
        zDepth1 = paneSize / (2 * Math.tan(Math.PI/panes1.length));
  
  for (let index = 0; index < panes1.length; index++) {
        xAngle1 = 360 / panes1.length * index;
      panes1[index].style.transform= "rotateX("+ xAngle1 +"deg) translateZ("+ zDepth1 +"px)";
    }
  
  slotMac1.addEventListener('animationend',function(){
    slotMac1.style.transform = 'rotateX('+degree1+')';
    slotMac1.classList.remove('animation1');
  });
  };
  
  
  function slot2Spin(){
    root.style.setProperty('--slot2Rotate',degree2);
    var panes2 = document.querySelectorAll('.slot2_item'),
        zDepth2 = paneSize / (2*Math.tan(Math.PI/panes2.length));
  
        for (let i =0;i<panes2.length;i++){
          xAngle2 = 360 / panes2.length * i;
          panes2[i].style.transform = "rotateX("+xAngle2+"deg) translateZ("+zDepth2+"px)";
        }
  slotMac2.addEventListener('animationend',function(){
    slotMac2.style.transform = 'rotateX('+degree2+')';
    slotMac2.classList.remove('animation2');
  });
  
  }
  
  function slot3Spin(){
    root.style.setProperty('--slot3Rotate',degree3);
    var panes3 = document.querySelectorAll('.slot3_item'),
        zDepth3 = paneSize / (2*Math.tan(Math.PI/panes3.length));
  
        for (let j =0;j<panes3.length;j++){
          xAngle3 = 360 / panes3.length * j;
          panes3[j].style.transform = "rotateX("+xAngle3+"deg) translateZ("+zDepth3+"px)";
        }
  slotMac3.addEventListener('animationend',function(){
    slotMac3.style.transform = 'rotateX('+degree3+')';
    leverBall.classList.remove('downBall');
    leverBar.classList.remove ('downBar');
    slotMac3.classList.remove('animation3');
    checkWinner();
  });
  
  }
  
  function  spin(){
  
  
  /*Degree Per By Item*/
  
  var perByItem = 360 / items.length;
  var winnerVal = 0;
  
  if(totalWRates < 100){
    var loserRate = totalWRates + (100 - totalWRates);
  }
  
  
  for(let index = 0;index<items.length;index++){
    if(index == 0){
          if(compare(rnd,'<=',winRates[index]) ){
              winnerVal = perByItem * index;
        degree1 = (360 + winnerVal)+'deg';
        degree2 = (720 + winnerVal) +'deg';
        degree3 = (1080 + winnerVal)+'deg';
          }
      }else{
          if(compare(rnd,'>',winRates[index-1]) && compare(rnd,'<=',winRates[index]) ){
              winnerVal = perByItem * index;
        degree1 = (360 + winnerVal)+'deg';
        degree2 = (720 + winnerVal) +'deg';
        degree3 = (1080 + winnerVal)+'deg';
          }
      }
  }
  if(compare(rnd,'>',winRates[items.length-1]) &&  compare(rnd,'<=',100)){
    winnerVal = rnd;
    degree1 =  (360 + (perByItem * randomInt(1,5))) + 'deg';
    degree2 =  (360 + (perByItem * randomInt(1,5)))+ 'deg';
    degree3 =  (360 + (perByItem * randomInt(5,6))) + 'deg';
  }
  
  console.table(winRates);
  console.log(winRates[items.length-1]);
  
  
  slot1Spin();
  slot2Spin();
  slot3Spin();
  
  
  console.log('loser Rate: '+loserRate);
  console.log('Total W Rate: '+totalWRates);
  console.log('Random: ' +rnd);
  console.log('degree1: '+ degree1);
  console.log('degree2: '+ degree2);
  console.log('degree3: '+ degree3);
  }
  
  
  function checkWinner(){
  
    var firstSlot = slotMac1.getBoundingClientRect();
      var secondSlot = slotMac2.getBoundingClientRect();
      var lastSlot = slotMac3.getBoundingClientRect();
      var loserModal = document.querySelector('.loser-modal');
    var winnerModal = document.querySelector('.winner-modal');
  
      var r1 = document.elementFromPoint(firstSlot.x+(firstSlot.width/2),firstSlot.y+(firstSlot.height/2+10));
      var r2 = document.elementFromPoint(secondSlot.x+(secondSlot.width/2),secondSlot.y+(secondSlot.height/2+10));
      var r3 = document.elementFromPoint(lastSlot.x+(lastSlot.width/2),lastSlot.y+(lastSlot.height/2+10));
  
      console.log('İlk: '+r1.parentElement.textContent);
      console.log('İkinci: ' + r2.parentElement.textContent);
      console.log('Son: ' + r3.parentElement.textContent);
    
    setTimeout(() => {
      if (r1.parentElement.textContent == r2.parentElement.textContent && r1.parentElement.textContent == r3.parentElement.textContent && rnd <= totalWRates) {
        winnerModal.innerHTML = `
        <div class="modal-title" >Tebrikler</div>
        <div class="modal-subtitle">%20 indirim kazandınız.</div>
        <div class="wis-code">F53DWE</div>
      `;
        winnerModal.style.display = 'flex';
      } else {
        loserModal.innerHTML = `
        <div class="modal-title" >Üzgünüm Kazanamadın</div>
        <button class="try-again-btn">Yeniden Dene</button>
      `;
        loserModal.style.display = 'flex';
        var againBtn = document.querySelector('.try-again-btn');
        if(gameCount > 0){
          gameCount--;
          counterDislpay.innerHTML = gameCount;
          againBtn.addEventListener('click', function () {
            rnd = randomInt(0, 100);
  
            loserModal.style.display = 'none';
  
            slotMac1.style = '';
            slotMac2.style = '';
            slotMac3.style = '';
            slotMac1.style = '';
            slotMac2.style = '';
            slotMac3.style = '';
            spin();
            console.log('kalan oyun hakkı: ' + gameCount);
            wisText.innerHTML = "<span class='wis-starter-txt'> You can spin "+gameCount+" more times.</span>"
          });
        }else{
          againBtn.textContent = 'Tüm Hakların Bitti';
          againBtn.disabled = true;
        }
      }
    }, 400);
  }
  
  init();
  spin();
    /*Start Spin*/
    leverBall.addEventListener('click',function(){
    leverBall.classList.add('downBall');
    leverBar.classList.add ('downBar');
    slotMac1.classList.add('animation1');
    slotMac2.classList.add('animation2');
    slotMac3.classList.add('animation3');
  });
  
  /*  machine[index].style.transform = 'rotateX('+degree1+')';*/
  
  
  /*
    machine[index].classlist.add('animation');
     setTimeout(() => {
       machine.classlist.remove('animation');    
     }, 5000);*/
  }
  slotMachine();