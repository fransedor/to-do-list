import '../styles/App.css';
import ListCategory from './ListCategory';
import {useState} from 'react';
import * as functions from '../handlers';
import { DragDropContext } from 'react-beautiful-dnd';
import { icons } from '../icons';

interface list {
	name: string;
	items: string[];
	id: number;
}

function App() {

	const [list, setList] = useState<list[]>([{name:"First Category", items:["First Item"], id:1}]);
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
							<button onClick={() => toggleAddList()} className="icon"><img src={icons.close} alt="" /></button>
						</div>
					</div>
				}
			</div>
    </div>
  );
}

export default App;
