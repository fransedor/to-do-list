import React from 'react';
import '../styles/ListCategory.css';
import ListItem from './ListItem';
import {useState} from 'react';
import * as functions from '../handlers';
import {Droppable, Draggable} from 'react-beautiful-dnd';
import { icons } from '../icons';

interface list {
	name: string;
	items: string[];
	id: number;
}

interface Props {
	name: string;
	id: number;
	list: list[];
	setList: Function;
}

const ListCategory = ({name, id, list, setList}:Props) => {
	const [addItem, setAddItem] = useState("");
	const [renameCategory, setRenameCategory] = useState("");
	const [isAddButtonClicked, setIsAddButtonClicked] = useState(false);
	const [isEditButtonClicked, setIsEditButtonClicked] = useState(false);

	const categoryIndex = list.findIndex((element) => element.id === id);

	const toggleEdit = () => {
		functions.toggleInput(setIsEditButtonClicked, isEditButtonClicked);
	}

	const toggleAddItem = () => {
		functions.toggleInput(setIsAddButtonClicked, isAddButtonClicked);
	}

	return (
		<div className="list-category">
			{!isEditButtonClicked ?
				<div className="list-header">
				<h2>{name}</h2>
					<div className="list-button">
						<button onClick={() => toggleEdit()} className="edit icon"><img src={icons.edit} alt="" /></button>
						<button onClick={() => functions.removeCategory(id, list, setList)} className="icon"><img src={icons.close} alt="" /></button>
					</div>
				</div>
			:
			<div className="flex">
				<input onChange={(e) => functions.inputHandler(e, setRenameCategory)} type="text" placeholder="Enter new category name..." />
				<button onClick={() => functions.changeCategory(id, renameCategory, list, setList, toggleEdit)} className="icon"><img src={icons.checklist} alt="" /></button>
				<button onClick={() => toggleEdit()} className="icon"><img src={icons.close} alt="" /></button>
			</div>
			}
			
			<Droppable droppableId={`${categoryIndex}`}>
				{(provided) => (
					<div className='list-items' ref={provided.innerRef} {...provided.droppableProps}>
						{list[categoryIndex].items && list[categoryIndex].items.map((element, i) => (
							<Draggable key={element} draggableId={`${categoryIndex}-${element}`} index={i}>
								{(provided) => (
									<ListItem name={element} id={id} list={list} setList={setList} innerRef={provided.innerRef} provided={provided}/>
								)}
							</Draggable>
						))}	
						{provided.placeholder}
					</div>
				)}
			</Droppable>
					
			{!isAddButtonClicked ? 
					<button onClick={() => toggleAddItem()} className="add-list">
						<span>+</span> Add an item
					</button>
					: 
					<div className="input-category">
						<input onChange={(e) => functions.inputHandler(e, setAddItem)} type="text" placeholder="Enter item name..." id="category" />
						<div className="input-buttons">
							<button onClick={() => functions.addListItem(id, addItem, list, setList, toggleAddItem)} className="add">Add Item</button>
							<button onClick={() => toggleAddItem()} className="icon"><img src={icons.close} alt="" /></button>
						</div>
					</div>
			}
		</div>
	)
}

export default ListCategory;
