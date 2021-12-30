/* 
This class filters json data with higher order functions and the fluent design pattern.

The menu items are provided in the following JSON format:
  [
    {
      name: string,
      price: number,
      allergens: string[]
      spicy: boolean
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
  filterRestaurantsByProperty(propertyName, satisfiesRequirements) {
    return this.filterRestaurants(r => {
      const property = lib220.getProperty(r, propertyName);
      return property.found && satisfiesRequirements(property.value);
    });
  }
}

module.exports = Menu;