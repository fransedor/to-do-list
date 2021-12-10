import React from 'react';
import './ListItem.css';
import {useState} from 'react';
import * as functions from './handlers';

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
	innerRef: () => any;
	provided: any;
}
const ListItem = ({name, id, list, setList,innerRef, provided}:Props) => {
	const [isEditListClicked, setIsEditListClicked] = useState(false);
	const [newName, setNewName] = useState("");

	const toggleEditList = () => {
		functions.toggleInput(setIsEditListClicked, isEditListClicked);
	}

	return (
		<div ref={innerRef} {...provided.dragHandleProps} {...provided.draggableProps}>
			{!isEditListClicked ? 
			<div className="list-item">
				<div className="item-name">
					<h3>{name}</h3>
				</div>
				<div className="item-button">
					<button onClick={() => toggleEditList()}>Edit</button>
					<button onClick={() => functions.removeListItem(id, name, list, setList)} >Delete</button>
				</div>
			</div>
			:
			<div className="input-category">
				<input onChange={(e) => functions.inputHandler(e, setNewName)} type="text" placeholder="Enter item name..." id="category" />
				<div className="input-buttons">
					<button onClick={() => functions.changeListItem(id, name, newName, list, setList, toggleEditList)} className="add">Change Item Name</button>
					<button onClick={() => toggleEditList()} className="close"><img src="https://cdn-icons.flaticon.com/png/512/2976/premium/2976286.png?token=exp=1638880654~hmac=a20adcc039217c25734f2efaf638bc09" alt="" /></button>
				</div>
			</div>}
		</div>
	)
}

export default ListItem;
