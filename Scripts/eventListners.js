import { addBtn, getDeleteIcons, getcheckboxElements, taskListELement, taskListLinks, taskListLinkActive, themBtn, clearBtn ,completedBtn,allBtn,TaskListValueContent } from "./elements"
import { addTask, deleteTask, toggelTask, toggleTheme,initTaskList,fetchDaat } from "./uitls"


const listElementsArray = (taskListELement?.children)

 taskListLinks.forEach(function(item) {
    item.addEventListener('click', function() {
       taskListLinks.forEach(function(link) {
           link.classList.remove("blue");
       });
       item.classList.add("blue");
    });
});


const hideCompletedTask = () =>{
  const activeLinkElments = Array.from(listElementsArray).filter((ele)=>ele.classList.contains("TaskList__taskContent--isActive")).map((e)=>e.classList.toggle("--HIDE"))
 
}

const clearCompletedTask = () => {
    Array.from(listElementsArray).forEach((ele) => {
        if (ele.classList.contains("TaskList__taskContent--isActive")) {
            ele.remove();
            deleteTask(ele,ele.lenght)
             initTaskList(fetchDaat("tasks"))
            ele.classList.remove("--isActive")
        }
    });
  }

const showCompletedTasks = ()=> {
   const activeLinkElments = Array.from(listElementsArray).filter((ele)=>ele.classList.contains("TaskList__taskContent--isActive") ? ele.style.display="flex" : ele.style.display="none" )


}

const showAllTasks = ()=> {
   const activeLinkElments = Array.from(listElementsArray).map((ele)=> ele.style.display="flex"  )
  console.log(activeLinkElments)
}


export const initalTaskListener = () => {
getDeleteIcons().forEach((icon, index) => {
    icon.addEventListener("click", (e) => deleteTask(e, index));
  });
  getcheckboxElements().forEach((box,index)=> {
    box.addEventListener("click", (e) => toggelTask(e, index))
    box.addEventListener("keydown",(e)=> {
        e.key === "Enter" && toggelTask(e,index)
    })
  })
};


export const initListners = () => {
    themBtn.addEventListener("click",toggleTheme )
    addBtn.addEventListener("click", addTask)
}

allBtn?.addEventListener("click", showAllTasks)
taskListLinkActive?.addEventListener("click", hideCompletedTask)
clearBtn?.addEventListener("click", clearCompletedTask)
completedBtn?.addEventListener("click", showCompletedTasks)


