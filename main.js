let nav = 0;
let clicked = null;
let events = localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')) : [];



var days = [ 'понедельник','вторник','среда','четверг','пятница','суббота', 'воскресенье' ];
var months = ['Январь','Февраль','Март','Апрель', 'Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'];


let todayDate = document.querySelector(".today_date");
let calendar = document.getElementById("calendar");
let newEvent = document.getElementById("newEventModal");
let shadowBack = document.getElementById("modalBack");
let eventInput = document.getElementById("eventTitleInput");
let closeWindow = document.getElementById('deleteEventModal');
let deleteText = document.getElementById('eventText');

// Сегодняшняя дата
function currentDay(){
  let currentDay = new Date();
  let currentDayString = currentDay.toLocaleDateString("ru",{
    weekday: 'long',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  })
  return currentDayString;
}
todayDate.innerText = currentDay();



// ф-ция открытия модального окна

function openModal(date){
  clicked = date;

  const eventForDay = events.find(e => e.date === clicked);

  if(eventForDay){
    closeWindow.style.display = "block";
    deleteText.innerHTML = eventForDay.title;
  }else{
    newEvent.style.display = "block";
  }
  shadowBack.style.display = "block";
}

// Закрыть модальное окно

function closeModal(){
  eventInput.classList.remove("error");
  newEvent.style.display = "none";
  shadowBack.style.display = "none";
  closeWindow.style.display = "none";
  eventInput.value = "";
  clicked = null;
  load();
}

// Добавить событие

function saveEvent(){
  if(eventInput.value){
    eventInput.classList.remove("error");


    events.push({
      date: clicked,
      title: eventInput.value,
    });
  closeModal();
  localStorage.setItem("events", JSON.stringify(events));
  } else{
    eventInput.classList.add("error");
  }
}

// Функция прогружающая всю информацию


function load(){

  const dt = new Date();

  if (nav !== 0){
    dt.setMonth(new Date().getMonth() + nav);
  }




  const day = dt.getDate();
  const month = dt.getMonth();
  const year = dt.getFullYear();


  const firstDayOfMonth = new Date(year,month, 1);
  const daysInMonth = new Date(year, month + 1 , 0).getDate();


  const dateString = firstDayOfMonth.toLocaleDateString('ru', {
    weekday: 'long',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  })


  const paddingDays = days.indexOf(dateString.split(', ')[0]);


  // Нынешний месяц и год
  let currentMonth = document.querySelector(".current_month");
  let currentMonthInner = `${dt.toLocaleDateString('ru',{
    month: 'long'
  })} ${year} `;
  let strokaMonth = currentMonthInner[0].toUpperCase() + currentMonthInner.slice(1);  
  currentMonth.innerText = strokaMonth;


  calendar.innerHTML = "";  


  // формирование календаря
  for(let i = 1; i<= paddingDays + daysInMonth; i++){
    
    const daySquare = document.createElement('div');
    daySquare.classList.add("day");

    const dayString = `${i - paddingDays}/${month + 1}/${year}`;


    if ( i> paddingDays){
      daySquare.innerText = i - paddingDays;

      if (daySquare.innerText == day && nav == 0 ){
        daySquare.style.backgroundColor = "#e8faed";
      }


      const eventForDay = events.find(e => e.date === dayString);

      if(eventForDay){
        const eventDiv = document.createElement("div");
        eventDiv.classList.add('event_div');
        eventDiv.innerText = eventForDay.title;
        daySquare.appendChild(eventDiv);
      }


      

      
      daySquare.addEventListener("click", () => openModal(dayString)); 

    }else{
      daySquare.classList.add("padding")
    }

  calendar.appendChild(daySquare);
  }



  console.log(month);
  console.log(dt.getMonth());
}


// удалить event

function deleteEvent(){
  events = events.filter(e  => e.date !== clicked);
  localStorage.setItem("events", JSON.stringify(events));
  closeModal();
}


// добавляет функции к кнопкам

function intitButtons(){

  document.querySelector('.next_btn').addEventListener('click', () =>{
    nav++;
    load();
  })

  document.querySelector('.prev_btn').addEventListener('click', () =>{
    nav--;
    load();
  })


  let saveEventBtn = document.getElementById('saveButton');
  let cancelEventBtn = document.getElementById("cancelButton");
  let deleteEventBtn = document.getElementById('deleteButton');
  let closeEventBtn = document.getElementById("closeButton");

  cancelEventBtn.addEventListener("click", closeModal);
  saveEventBtn.addEventListener("click", saveEvent);
  closeEventBtn.addEventListener("click", closeModal);
  deleteEventBtn.addEventListener("click", deleteEvent);

}

intitButtons();
load();


let box  = events.filter(e  => e.date !== clicked);
console.log(box);




