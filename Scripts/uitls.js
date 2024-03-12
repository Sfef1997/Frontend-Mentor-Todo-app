import { mainElment, searchInput, taskListELement ,darkThemeImg,itemsCount,  } from "./elements"
import { initalTaskListener } from "./eventListners"

export const fetchDaat = (key)=>{
  try{
     const data = localStorage.getItem(key)
    return data ? JSON.parse(data) : false
  }catch (error) {
        console.log("error Parsing JSON",error )
        return null

  }


}

export const renderTaskList = (tasks)=> {
     let taskList =``
    tasks?.forEach((task) => {
        taskList +=  `<li class="${task.isCompleted ? "TaskList__taskContent--isActive" : "TaskList__taskContent"} " >
        <div class="TaskList__checkbox" tabindex="0" role="button"> 
        <img class="TaskList__checkboxImg" src="./assets/icon-checkmark.svg" alt"checkmark" />
            </div>
        <div class="TaskList__valueContent">
        <p class="TaskList__value">
        ${task.value}
        </p>
        <img src="./images/icon-cross.svg" alt="cross icon" class="TaskList__deleteIcon" />
        </div>
        </li>
        `
        })
        let itemLenght = fetchDaat("tasks").length
        let listItems = ` <span class="items--count">${itemLenght} items left</span>`
        taskListELement.innerHTML = taskList

        // [ToDo] one All item is Dleted stayed Item Count By 1
        // [ToDo] one All item is Dleted the last item get ot from the First time Delted
        itemsCount.innerHTML = listItems
        searchInput.value = ""
}

export const deleteTask =(e,index)=> {
 const answer = confirm("are you sure you want delete that Task ? 🤔")
    if(answer === false) return
    const tasks = fetchDaat("tasks")
    tasks.splice(index,1)
    saveToDB("tasks",tasks)
     initTaskList(tasks)
}

export const addTask = (e)=> {
    e.preventDefault()
    if(searchInput.value){
        const task ={
            value : searchInput.value,
            isCompleted :false,
        }
        const tasks = fetchDaat("tasks") || []
        tasks?.push(task)
        saveToDB("tasks",tasks)
        initTaskList(tasks)
    }
}

export const toggleTheme = () => {
    mainElment.classList.toggle("App--isDark")
    darkThemeImg.src="images/bg-desktop-dark.jpg"
    saveToDB("darkModeFlag", mainElment?.classList.contains("App--isDark"))
    if(!fetchDaat("darkModeFlag"))  {
        darkThemeImg.src="images/bg-desktop-light.jpg"
    }
}

export const saveToDB = (key,data)=> {
    localStorage.setItem(key,JSON.stringify(data))
} 

export const initDataOnStartUp = () => {
    fetchDaat("darkModeFlag") && toggleTheme()
    initTaskList(fetchDaat("tasks"))
}

export const initTaskList= (tasks) => {
if(tasks?.length){
        renderTaskList(tasks);
        initalTaskListener();
    }
}

export const toggelTask = (e,index) => {
    const  tasks = fetchDaat("tasks")
    e.currentTarget.parentElement?.classList.toggle("TaskList__taskContent--isActive")
    tasks[index].isCompleted = !tasks[index].isCompleted
    saveToDB("tasks",tasks)
}

