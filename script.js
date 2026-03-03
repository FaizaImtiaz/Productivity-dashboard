function openFeatures() {
    var allElems = document.querySelectorAll('.elem')
    var fullElemPage = document.querySelectorAll('.fullElem')
    var fullElemPageBackBtn = document.querySelectorAll('.fullElem .back')

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

    var currentTask = []

    if (localStorage.getItem('currentTask')) {
        currentTask = JSON.parse(localStorage.getItem('currentTask'))
    } else {
        console.log('Task list is Empty');
    }



    function renderTask() {

        var allTask = document.querySelector('.allTask')

        var sum = ''

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


function dailyPlanner() {
    var dayPlanner = document.querySelector('.day-planner')

    var dayPlanData = JSON.parse(localStorage.getItem('dayPlanData')) || {}

    var hours = Array.from({ length: 18 }, (_, idx) => `${6 + idx}:00 - ${7 + idx}:00`)


    var wholeDaySum = ''
    hours.forEach(function (elem, idx) {

        var savedData = dayPlanData[idx] || ''

        wholeDaySum = wholeDaySum + `<div class="day-planner-time">
    <p>${elem}</p>
    <input id=${idx} type="text" placeholder="..." value=${savedData}>
</div>`
    })

    dayPlanner.innerHTML = wholeDaySum


    var dayPlannerInput = document.querySelectorAll('.day-planner input')

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
    var motivationQuoteContent = document.querySelector('.motivation-2 h1')
    var motivationAuthor = document.querySelector('.motivation-3 h2')

    async function fetchQuote() {
        try {
            let response = await fetch('https://dummyjson.com/quotes/random')
            let data = await response.json()

            motivationQuoteContent.innerHTML = data.quote
            motivationAuthor.innerHTML = data.author
        } catch (error) {
            console.log("Error fetching quote:", error)
        }
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


    // I have removed API key for security purpose
    var apiKey = '1c9082c1db58409b81d62908261302'
    var city = 'Pakistan'



    var header1Time = document.querySelector('.header1 h1')
    var header1Date = document.querySelector('.header1 h2')
    var header2Temp = document.querySelector('.header2 h2')
    var header1City = document.querySelector('.header1 h4')
    var header2Condition = document.querySelector('.header2 h4')
    var precipitation = document.querySelector('.header2 .precipitation')
    var humidity = document.querySelector('.header2 .humidity')
    var wind = document.querySelector('.header2 .wind')

    var data = null

    async function weatherAPICall() {
        var response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`)
        data = await response.json()
        header1City.innerHTML = data.location.name
        header2Temp.innerHTML = `${data.current.temp_c}°C`
        header2Condition.innerHTML = `${data.current.condition.text}`
        wind.innerHTML = `Wind: ${data.current.wind_kph} km/h`
        humidity.innerHTML = `Humidity: ${data.current.humidity}%`
        precipitation.innerHTML = `Heat Index : ${data.current.heatindex_c}%`
    }

    weatherAPICall()


    function timeDate() {
        const totalDaysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

        const monthNames = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        var date = new Date()
        var dayOfWeek = totalDaysOfWeek[date.getDay()]
        var hours = date.getHours()
        var minutes = date.getMinutes()
        var seconds = date.getSeconds()
        var tarik = date.getDate()
        var month = monthNames[date.getMonth()]
        var year = date.getFullYear()

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

    var theme = document.querySelector('.theme')
    var rootElement = document.documentElement

    var flag = 0
    theme.addEventListener('click', function () {

        if (flag == 0) {
            rootElement.style.setProperty('--pri', '#3A0519')
            rootElement.style.setProperty('--sec', '#670D2F')
            rootElement.style.setProperty('--tri1', '#A53860')
            rootElement.style.setProperty('--tri2', '#EF88AD')
            flag = 1
        } else if (flag == 1) {
            rootElement.style.setProperty('--pri', '#213448')
            rootElement.style.setProperty('--sec', '#547792')
            rootElement.style.setProperty('--tri1', '#94B4C1')
            rootElement.style.setProperty('--tri2', '#EAE0CF')
            flag = 2
        } else if (flag == 2) {
            rootElement.style.setProperty('--pri', '#543310')
            rootElement.style.setProperty('--sec', '#74512D')
            rootElement.style.setProperty('--tri1', '#AF8F6F')
            rootElement.style.setProperty('--tri2', '#F8F4E1')
            flag = 0
        }

    })


}

changeTheme()