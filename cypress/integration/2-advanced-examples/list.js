describe('list', () => {

	it('user can create new list items', () => {
		// go to website
		cy.visit('http://localhost:3000');
		// press add list category
		cy.findByRole('button', {  name: /\+ add list category/i}).click();
		// insert category name
		cy.findByRole('textbox').type('Another category');
		// press add category
		cy.findByRole('button', {  name: /add list category/i}).click();
		// press add list item
		cy.get('.list-category').findByRole('button', {  name: /\+ Add an item/i}).click();
		// insert item name
		cy.findByRole('textbox').type('Another Item');
		// press add item
		cy.findByRole('button', {  name: /add item/i}).click();
	})

	it('user can edit item name', () => {
		// user click edit on first item
		cy.get('[data-rbd-drag-handle-draggable-id="0-First Item"] > .list-item > .item-button > :nth-child(1)').click();
		// user insert new name on first item
		cy.get('#category').type('Name editted');
		// user click change item name
		cy.get('.add').click();
	})
	it('user can delete item', () => {
		//user click on delete
		cy.get('[data-rbd-drag-handle-draggable-id="0-Name editted"] > .list-item > .item-button > :nth-child(2)').click();
	})

	it('user cannot use the same name for multiple items', () => {
		// user click on add item
		cy.get(':nth-child(1) > .add-list').click();
		// user type in the same name
		cy.get('#category').type('Another Item');
		// user click on add item
		cy.get('.add').click();
		// get windows alert
		cy.on('window:alert', (str) => {
			expect(str).to.equal(`Use different names for list items`)
		})
		// user rename to another name
		cy.get('#category').clear().type('Not the same name');
		// user click on add item
		cy.get('.add').click();
	})

	// Drag and Drop test is not done yet
	it('user can drag and drop item', () => {
		const dataTransfer = new DataTransfer();

		cy.get('[data-rbd-drag-handle-draggable-id="0-Another Item"] > .list-item').trigger('dragstart', {
			dataTransfer
		});
		cy.get(':nth-child(2) > .list-items').trigger('drop', {
			dataTransfer
		})
		cy.get('[data-rbd-drag-handle-draggable-id="0-Another Item"] > .list-item').drag(':nth-child(2) > .list-items');
	})
})