function findObjectByPropertyValue()
  
const findObjectByPropertyValue = (array, property, value) => {
    // Loop through each object in the array
    for (let i = 0; i < array.length; i++) {
        // Check if the current object's property value matches the specified value
        if (array[i][property] === value) {
            // If a match is found, return the object
            return array[i];
        }
    }
    // If no match is found, return null
    return null;
}