// Table name: restaurants

const fetchAllRestaurants = async (db) => {
  const query = 'SELECT * FROM restaurants';
  const results = await db.all(query, []);
  return { restaurants: results };
};

const fetchRestaurantById = async (db, id) => {
  const query = 'SELECT * FROM restaurants WHERE id = ?';
  const result = await db.all(query, [id]);

  if (result.length > 0) {
    return { restaurant: result[0] };
  } else {
    return { restaurant: {} };
  }
};

const fetchRestaurantByCuisine = async (db, cuisine) => {
  const query = 'SELECT * FROM restaurants WHERE LOWER(cuisine) = LOWER(?)';
  const result = await db.all(query, [cuisine]);

  return { restaurant: result };
};

const filterRestaurants = async (db, isVeg, hasOutdoorSeating, isLuxury) => {
  const query =
    'SELECT * FROM restaurants WHERE isVeg = ? AND hasOutdoorSeating = ? AND isLuxury = ?';
  const result = await db.all(query, [isVeg, hasOutdoorSeating, isLuxury]);

  return { restaurant: result };
};

const sortRestaurantsByRatings = async (db) => {
  const query = 'SELECT * FROM restaurants ORDER BY rating DESC';
  const result = await db.all(query, []);

  return { restaurant: result };
};

module.exports = {
  fetchAllRestaurants,
  fetchRestaurantById,
  fetchRestaurantByCuisine,
  filterRestaurants,
  sortRestaurantsByRatings,
};
