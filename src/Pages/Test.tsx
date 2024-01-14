import React, { useState } from 'react';

const MyComponent = () => {
    const [items, setItems] = useState([
        { id: 1, name: 'Item 1' },
        { id: 2, name: 'Item 2' },
        { id: 3, name: 'Item 3' },
    ]);

    // Function to update the state
    const updateItem = (itemId: any, newName: any) => {
        // Create a new array with the updated item
        const updatedItems = items.map(item =>
            item.id === itemId ? { ...item, name: newName } : item
        );

        // Set the new state
        setItems(updatedItems);
    };

    return (
        <div>
            {items.map(item => (
                <div key={item.id}>
                    {item.name}
                    <button onClick={() => updateItem(item.id, `New ${item.name}`)}>
                        Update
                    </button>
                </div>
            ))}
        </div>
    );
};

export default MyComponent;