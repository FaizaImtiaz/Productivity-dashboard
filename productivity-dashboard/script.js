function openFeatures() {
    let allElems = document.querySelectorAll('.elem')
    let fullElemPage = document.querySelectorAll('.fullElem')
    let fullElemPageBackBtn = document.querySelectorAll('.fullElem .back')

    allElems.forEach(function (elem) {
        elem.addEventListener('click', function () {
            fullElemPage[elem.id].style.display = 'block'
        })
    })

    fullElemPageBackBtn.forEach(function (back) {
        back.addEventListener('click', function () {
            fullElemPage[back.id].style.display = 'none'
        })
    })
}

openFeatures()


function todoList() {

    let currentTask = []

    if (localStorage.getItem('currentTask')) {
        currentTask = JSON.parse(localStorage.getItem('currentTask'))
    } else {
        console.log('Task list is Empty');
    }



    function renderTask() {

        let allTask = document.querySelector('.allTask')

        let sum = ''

        currentTask.forEach(function (elem, idx) {
            sum = sum + `<div class="task">
        <h5>${elem.task} <span class=${elem.imp}>imp</span></h5>
        <button id=${idx}>Mark as Completed</button>
        </div>`
        })

        allTask.innerHTML = sum

        localStorage.setItem('currentTask', JSON.stringify(currentTask))

        document.querySelectorAll('.task button').forEach(function (btn) {
            btn.addEventListener('click', function () {
                currentTask.splice(btn.id, 1)
                renderTask()
            })
        })
    }
    renderTask()

    let form = document.querySelector('.addTask form')
    let taskInput = document.querySelector('.addTask form #task-input')
    let taskDetailsInput = document.querySelector('.addTask form textarea')
    let taskCheckbox = document.querySelector('.addTask form #check')

    form.addEventListener('submit', function (e) {
        e.preventDefault()
        currentTask.push(
            {
                task: taskInput.value,
                details: taskDetailsInput.value,
                imp: taskCheckbox.checked
            }
        )
        renderTask()

        taskCheckbox.checked = false
        taskInput.value = ''
        taskDetailsInput.value = ''
    })



}

todoList()


fetch("https://ipapi.co/json/")
  .then(response => response.json())
  .then(data => {
    document.getElementById("country").innerText = "You are visiting from " + data.country_name;
  })
  .catch(error => {
    console.log("Error:", error);
  });


function dailyPlanner() {
    let dayPlanner = document.querySelector('.day-planner')

    let dayPlanData = JSON.parse(localStorage.getItem('dayPlanData')) || {}

    let hours = Array.from({ length: 18 }, (_, idx) => `${6 + idx}:00 - ${7 + idx}:00`)


    let wholeDaySum = ''
    hours.forEach(function (elem, idx) {

        let savedData = dayPlanData[idx] || ''

        wholeDaySum = wholeDaySum + `<div class="day-planner-time">
    <p>${elem}</p>
    <input id=${idx} type="text" placeholder="..." value=${savedData}>
</div>`
    })

    dayPlanner.innerHTML = wholeDaySum


    let dayPlannerInput = document.querySelectorAll('.day-planner input')

    dayPlannerInput.forEach(function (elem) {
        elem.addEventListener('input', function () {
            console.log('hello');
            dayPlanData[elem.id] = elem.value

            localStorage.setItem('dayPlanData', JSON.stringify(dayPlanData))
        })
    })
}

dailyPlanner()


function motivationalQuote() {
    let motivationQuoteContent = document.querySelector('.motivation-2 h1')
    let motivationAuthor = document.querySelector('.motivation-3 h2')

    async function fetchQuote() {
        let response = await fetch('https://api.quotable.io/random')
        let data = await response.json()

        motivationQuoteContent.innerHTML = data.content
        motivationAuthor.innerHTML = data.author
    }

    fetchQuote()
}

motivationalQuote()

function pomodoroTimer() {
    const timer = document.querySelector('.pomo-timer h1');
    const startBtn = document.querySelector('.pomo-timer .start-timer');
    const pauseBtn = document.querySelector('.pomo-timer .pause-timer');
    const resetBtn = document.querySelector('.pomo-timer .reset-timer');

    let totalSeconds = 10 * 60 * 60; // 10 hours
    let interval = null;

    const update = () => {
        const h = Math.floor(totalSeconds / 3600);
        const m = Math.floor((totalSeconds % 3600) / 60);
        const s = totalSeconds % 60;
        timer.textContent = `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
    };

    const start = () => {
        if (interval) return;
        interval = setInterval(() => {
            if (totalSeconds-- > 0) update();
            else clearInterval(interval);
        }, 1000);
    };

    const pause = () => { clearInterval(interval); interval = null; };
    const reset = () => { clearInterval(interval); interval = null; totalSeconds = 10*60*60; update(); };

    startBtn.addEventListener('click', start);
    pauseBtn.addEventListener('click', pause);
    resetBtn.addEventListener('click', reset);

    update();
}

pomodoroTimer();



function weatherFunctionality() {
    var apiKey = 12345&q
    var city = 'Lahore'

    let header1Time = document.querySelector('.header1 h1')
    let header1Date = document.querySelector('.header1 h2')
    let header2Temp = document.querySelector('.header2 h2')
    let header2Condition = document.querySelector('.header2 h4')
    let precipitation = document.querySelector('.header2 .precipitation')
    let humidity = document.querySelector('.header2 .humidity')
    let wind = document.querySelector('.header2 .wind')

    let data = null

    async function weatherAPICall() {
        let response = await fetch(`//https:api.weatherapi.com/v1/current.json?key={apiKey}&q=${city}`)
        data = await response.json()

        header2Temp.innerHTML = `${data.current.temp_c}°C`
        header2Condition.innerHTML = `${data.current.condition.text}`
        wind.innerHTML = `Wind: ${data.current.wind_kph} km/h`
        humidity.innerHTML = `Humidity: ${data.current.humidity}%`
        precipitation.innerHTML = `Heat Index : ${data.current.heatindex_c}°C`
    }

    weatherAPICall()


    function timeDate() {
        const totalDaysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

        const monthNames = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        let date = new Date()
        let dayOfWeek = totalDaysOfWeek[date.getDay()]
        let hours = date.getHours()
        let minutes = date.getMinutes()
        let seconds = date.getSeconds()
        let tarik = date.getDate()
        let month = monthNames[date.getMonth()]
        let year = date.getFullYear()

        header1Date.innerHTML = `${tarik} ${month}, ${year}`

        if (hours > 12) {
            header1Time.innerHTML = `${dayOfWeek}, ${String(hours - 12).padStart('2', '0')}:${String(minutes).padStart('2', '0')}:${String(seconds).padStart('2', '0')} PM`

        } else {
            header1Time.innerHTML = `${dayOfWeek}, ${String(hours).padStart('2', '0')}:${String(minutes).padStart('2', '0')}:${String(seconds).padStart('2', '0')} AM`
        }
    }

    setInterval(() => {
        timeDate()
    }, 1000);

}

weatherFunctionality()


function changeTheme() {

    let theme = document.querySelector('.theme')
    let rootElement = document.documentElement

    let flag = 0
    theme.addEventListener('click', function () {

        if (flag == 0) {
            rootElement.style.setProperty('--pri', '#ffc6c4')
            rootElement.style.setProperty('--sec', '#e38191')
            rootElement.style.setProperty('--tri1', '#ad4746')
            rootElement.style.setProperty('--tri2', '#672029')
            flag = 1
        } else if (flag == 1) {
            rootElement.style.setProperty('--pri', '#eff3ff')
            rootElement.style.setProperty('--sec', '#bdd7e7')
            rootElement.style.setProperty('--tri1', '#6baed6')
            rootElement.style.setProperty('--tri2', '#2171b5')
            flag = 2
        } else if (flag == 2) {
            rootElement.style.setProperty('--pri', '#63589f')
            rootElement.style.setProperty('--sec', '#f3e0f7')
            rootElement.style.setProperty('--tri1', '#d1afe8')
            rootElement.style.setProperty('--tri2', '#9f82ce')
            flag = 0
        }

    })


}

changeTheme()