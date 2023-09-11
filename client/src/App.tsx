import React,{useState} from 'react';
import Header from './Components/Header';
import TaskSource from './Components/TaskSource';
import TaskList from './Components/TaskList';
import AddTask from './Components/AddTask';

function App() {
  const [showAddTask , setshowAddTask] = useState(false);
  return (
    <TaskSource>
      <div className="container">
        <Header showadd={showAddTask} onToggleShow={()=> setshowAddTask(!showAddTask)}/>
        {showAddTask && <AddTask></AddTask>}
        <TaskList></TaskList>
      </div>
    </TaskSource>
    
  );
}

export default App;
