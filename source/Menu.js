/* 
This class filters json data with higher order functions and the fluent design pattern.

The menu items are provided in the following JSON format. None of the properies are garunteed to be there
  [
    {
      "name": String,
      "price": number,
      "section": String,                // the section of the menu
      "allergens": String[],
      "spicy": boolean,
      "sizes": {
        [key: String]: number           // the number indicates the addition the size choice makes to the price
      }
      "description": String
    }, ...
  ]
*/

class Menu {
  items;

  constructor(jsonData) {
    this.items = jsonData;
  }

  // filterMenu(isValidFood: (food) => boolean): Menu
  // ARGUMENTS: isValidFood: (food) => boolean - the function used to tell which restaurants to filter out of the list
  // RETURNS: Menu - the new Menu object with data including only foods that satisfied the isValidFood function
  // filterMenu is used to make menu filtering more succinct and rewrapped in a Menu class
  filterMenu(isValidFood) {
    return new Menu(this.items.filter(r => isValidFood(r)));
  }

  // filterMenuByProperty(propertyName: string, satisfiesRequirements: (any) => boolean): Menu
  // ARGUMENTS: propertyName: string - the name of the property that is being filtered
  //            satisfiesRequirements: (any) => boolean - a function that indicates whether a given food satisfies the given requirements
  // RETURNS: Menu - the new Menu object with data including only foods that had the propertyName present and a satisfactory corresponding value
  // filterMenuByProperty builds off of filterMenu to generalize menu filtering by a given property requirement
  filterMenuByProperty(propertyName, satisfiesRequirements) {
    return this.filterMenu(r => r.hasOwnProperty(propertyName) && satisfiesRequirements(r[propertyName]) );
  }


}

module.exports = Menu;