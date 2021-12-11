
interface list {
	name: string;
	items: string[];
	id: number;
}


export const inputHandler = (event: {target: HTMLInputElement}, set:Function) => {
	let value = event.target.value;
	set(value);
}

export const toggleInput = (set:Function, state:boolean) => {
	set(!state);
}

export const handleDragDrop = (result:any, list:list[], set:Function) => {
	if(!result.destination) return;

	const sourceCategory = result.source.droppableId;
	const destinationCategory = result.destination.droppableId;
	const sourceIndex = result.source.index;
	const destinationIndex = result.destination.index;
	const draggedName = result.draggableId.split("-")[1];

	const checkDuplicates = list[destinationCategory].items.findIndex((element) => element === draggedName);

	if (checkDuplicates < 0) {
		let newList = [...list];
		const [draggedItem] = newList[sourceCategory].items.splice(sourceIndex, 1);
		newList[destinationCategory].items.splice(destinationIndex, 0, draggedItem);

		set([...newList]);
	}
	if (checkDuplicates >= 0 ) {
		window.alert("Can't have two items with same name in a category");
	}
}

export const addListItem = (id:number, input:string, list:list[], set: Function, reset:Function) => {
	const categoryIndex = list.findIndex((element) => element.id === id);
	const checkDuplicates = list[categoryIndex].items.findIndex((element) => element === input);

	if (checkDuplicates < 0) {
		let newList = [...list];
		newList[categoryIndex].items.push(input);
		set([...newList]);
		reset();
	}
	if (checkDuplicates >= 0) {
		window.alert("Use different names for list items");
		console.log('duplicates detected');	
	}
}

export const changeListItem = (id:number, oldName:string, newName:string, list:list[], set: Function, reset:Function) => {
	const categoryIndex = list.findIndex((element) => element.id === id);
	const checkDuplicates = list[categoryIndex].items.findIndex((element) => element === newName);

	if (checkDuplicates < 0) {
		let newList = [...list];
		const listItemIndex = newList[categoryIndex].items.findIndex((name) => name === oldName);
		newList[categoryIndex].items[listItemIndex] = newName;
		set([...newList]);
		reset();
	}

	if (checkDuplicates >= 0) {
		window.alert("Use different names for list items");
	}
}

export const removeListItem = (id:number, name:string, list:list[], set: Function) => {
	const categoryIndex = list.findIndex((element) => element.id === id);
	let newList = [...list];
	const listItemIndex = newList[categoryIndex].items.findIndex((element) => element === name);
	newList[categoryIndex].items.splice(listItemIndex,1);
	set([...newList]);
}


export const addCategory = (input:string, list:list[], set:Function, reset:Function) => {
	set([...list, {name: input, items: [], id: Math.ceil(Math.random()*101*Date.now())}]);
	reset();
}

export const changeCategory = (id:number, input:string, list:list[], set:Function, reset:Function) => {
	const categoryIndex = list.findIndex((element) => element.id === id);
	let newList = [...list];
	newList[categoryIndex].name = input;
	set([...newList]);
	reset();
}

export const removeCategory = (id:number, list:list[], set:Function) => {
	const categoryIndex = list.findIndex((element) => element.id === id);
	let newList = [...list];
	newList.splice(categoryIndex,1);
	set([...newList]);
}

