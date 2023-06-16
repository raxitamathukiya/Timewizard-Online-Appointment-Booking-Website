


document.querySelector("#bt").addEventListener("click", function () {
    document.querySelector(".popup").style.display = "flex"
  })
  document.querySelector(".gg-format-justify").addEventListener("click", function () {
    document.querySelector(".inul").style.display = "flex"
  })
  document.querySelector(".close").addEventListener("click", function () {
    document.querySelector(".popup").style.display = "none"

  })
  document.querySelector(".close2").addEventListener("click", function () {
    document.querySelector(".inul").style.display = "none"

  })
  document.querySelector(".close1").addEventListener("click", function () {

    document.querySelector(".popup1").style.display = "none";
    window.location.href = "index.html"

  })

  document.querySelector("#gs").addEventListener("click", function () {
    let email = document.querySelector("#email").value;
    let name =document.querySelector(".name").value ;
    let obj={
      Name:name,
      Email:email
    }
    if (email == "" || name=="") {
      document.querySelector("#email").style.border = "red 1px solid"
    } else {
      localStorage.setItem("calendly_user", JSON.stringify(obj))
      document.querySelector(".popup").style.display = "none"
      document.querySelector(".popup1").style.display = "flex"

      count = 30;
      function tim() {
        count--;
        document.querySelector("#co").innerText = count;
        if (count == 0) {
          clearInterval(id)

        }
      }
    }

    let id = setInterval(tim, 1000)

  })
  let count;


  document.querySelector("#send").addEventListener("click", function () {
    count = 30;
    function tim() {
      count--;
      document.querySelector("#co").innerText = count;
      if (count == 0) {
        clearInterval(id)

      }
    }

    let id = setInterval(tim, 1000)
  })



  function clickEvent(first, last) {
    if (first.value.length) {
      document.getElementById(last).focus()
    }
  }
  document.querySelector("#gs1").addEventListener("click", function () {
    let fst = document.getElementById("fst").value;
    let sec = document.getElementById("sec").value;
    let thr = document.getElementById("thr").value;
    let fr = document.getElementById("for").value;
    let fiv = document.getElementById("fiv").value;

    if (count == 0) {
      alert("Time Out Try again")
      document.getElementById("fst").value = null;
      document.getElementById("sec").value = null;
      document.getElementById("thr").value = null;
      document.getElementById("for").value = null;
      document.getElementById("fiv").value = null;

    }
    else if (fst != 1 || sec != 2 || thr != 3 || fr != 4 || fiv != 5) {
      alert("Wrong Otp")
      document.getElementById("fst").value = null;
      document.getElementById("sec").value = null;
      document.getElementById("thr").value = null;
      document.getElementById("for").value = null;
      document.getElementById("fiv").value = null;
    }


    else {
      window.location.href = "signup.html"
    }

  })

const isLeapYear=(year)=>{
    return(
        (year % 4 === 0 && year % 100 !==0 && year % 400 !==0)||
        (year % 100 === 0 && year % 400 === 0)
    );
};
const getFebDays=(year)=>{
    return isLeapYear(year) ? 29 :28;
};
let calendar =document.querySelector('.calendar');
let month_names=[
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
];

const month_picker=document.querySelector('#month-picker')
const dayTextFormate=document.querySelector('.day-text-formate')
const timeFormate=document.querySelector('.time-formate')
const dateFormate=document.querySelector('.date-formate')
let month_list=calendar.querySelector('.month-list');

month_picker.onclick=()=>{
    month_list.classList.remove('hideonce')
    month_list.classList.remove('hide')
    month_list.classList.add('show')
    dayTextFormate.classList.remove('showtime')
    dayTextFormate.classList.add('hidetime')
    timeFormate.classList.remove('showtime')
    timeFormate.classList.add('hideTime')
    dateFormate.classList.remove('showtime')
    dateFormate.classList.add('hideTime')


}

const generateCalender=(month,year)=>{
    let calendar_days=document.querySelector('.calendar-days');
    calendar_days.innerHTML='';
    let calendar_header_year=document.querySelector('#year');
    let days_of_month=[
        31,
        getFebDays(year),
        31,
        30,
        31,
        30,
        31,
        31,
       30,
       31,
       30,
       31

    ];
    let currentDate=new Date();
    month_picker.innerHTML=month_names[month];
    calendar_header_year.innerHTML=year;
    let first_day=new Date(year,month);

    for(let i=0;i<=days_of_month[month]+first_day.getDay()-1;i++){
        let day=document.createElement('div')
     
        if(i>=first_day.getDay()){
            day.innerHTML=i-first_day.getDay()+1
            if(i-first_day.getDay()+1===currentDate.getDate()&& year ===currentDate.getFullYear()&& month === currentDate.getMonth()){
                day.classList.add('current-date')
            }
        }
        calendar_days.appendChild(day)
        day.addEventListener("click",()=>{
          //console.log(+(day.textContent),month,year)
          // var dateString = "15 5 2023";
          // var dateComponents = dateString.split(" ");
          // var day = parseInt(dateComponents[0]);
          // var month = parseInt(dateComponents[1]) - 1; // Months in JavaScript are zero-based (0-11)
          // var year = parseInt(dateComponents[2]);

          var date = new Date(year, month, +(day.textContent));

          let obj={
            "date":date
          }
          console.log(obj)
        })
    }
   
  
}


month_names.forEach((e,index)=>{
    let month=document.createElement('div');
    month.innerHTML=`<div>${e}</div>`;
    month_list.append(month);
    month.onclick=()=>{
        currentMonth.value=index;
        generateCalender(currentMonth.value,currentYear.value);
        month_list.classList.replace('show','hide')
        dayTextFormate.classList.remove('hideTime')
        dayTextFormate.classList.add('showtime')
        timeFormate.classList.remove('hideTime')
        timeFormate.classList.add('showtime')
        dateFormate.classList.remove('hideTime')
        dateFormate.classList.add('showtime')
        month_list.classList.add('hideonce')
        
    }
    

})



document.querySelector('#pre-year').onclick=()=>{
    --currentYear.value;
    generateCalender(currentMonth.value,currentYear.value)
}
document.querySelector('#next-year').onclick=()=>{
    ++currentYear.value;
    generateCalender(currentMonth.value,currentYear.value)
}

let currentDate=new Date()
let currentMonth={value:currentDate.getMonth()}
let currentYear={value:currentDate.getFullYear()}
generateCalender(currentMonth.value,currentYear.value);

const todayShowTime=document.querySelector('.time-formate')
const todayShowDate=document.querySelector('.date-formate')

const currshowData=new Date();
const showCurrentDateOption={
    year:'numeric',
    month:'long',
    day:'numeric',
    weekday:'long'
}

const currrentDateFormate=new Intl.DateTimeFormat(
    'en-US',
    showCurrentDateOption
    ).format(currentDate);
    todayShowDate.textContent=currrentDateFormate;
    setInterval(()=>{

        const timer=new Date();
        const option={
            hour:'numeric',
            minute:'numeric',
            second:'numeric'
        };
        const formateTimer=new Intl.DateTimeFormat('en-US',option).format(timer);
        let time=`${`${timer.getHours()}`.padStart(2,'0')}:${`${timer.getMinutes()}`.padStart(2,'0')}:${`${timer.getSeconds()}`.padStart(2,'0')}`;
        todayShowTime.textContent=formateTimer;
    },1000);

    (function (){
        month_list.classList.add('hideonce')
    })();

