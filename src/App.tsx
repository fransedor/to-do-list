import './App.css';
import ListCategory from './ListCategory';
import {useState} from 'react';
import * as functions from './handlers';
import { DragDropContext } from 'react-beautiful-dnd';

interface list {
	name: string;
	items: string[];
	id: number;
}

function App() {

	const [list, setList] = useState<list[]>([{name:"Problems", items:["Brainstorming"], id:1}]);
	const [inputValue, setInputValue] = useState("");
	const [isAddListClicked, setIsAddListClicked] = useState(false);

	const toggleAddList = () => {
		functions.toggleInput(setIsAddListClicked, isAddListClicked);
	}
  return (
    <div className="App">
      <header className="title">
				<h1>To Do List</h1>
			</header>
			<div className="container">
				<DragDropContext onDragEnd={(result) => functions.handleDragDrop(result, list, setList)}>
				{list && list.map((element,i) => 
					(<ListCategory name={element.name} id={element.id} key={i} list={list} setList={setList}/>)
				)}
				</DragDropContext>
				{!isAddListClicked ? 
					<button onClick={() => toggleAddList()} className="add-list">
						<span>+</span> Add list category
					</button>
					: 
					<div className="input-category">
						<input onChange={(e) => functions.inputHandler(e, setInputValue)} type="text" placeholder="Enter list category" id="category" />
						<div className="input-buttons">
							<button onClick={() => functions.addCategory(inputValue, list, setList, toggleAddList)} className="add">Add List Category</button>
							<button onClick={() => functions.toggleInput(setIsAddListClicked, isAddListClicked)} className="close"><img src="https://cdn-icons.flaticon.com/png/512/2976/premium/2976286.png?token=exp=1638880654~hmac=a20adcc039217c25734f2efaf638bc09" alt="" /></button>
						</div>
					</div>
				}
			</div>
    </div>
  );
}

export default App;
