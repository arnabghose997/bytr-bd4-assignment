// Table name: dishes

const fetchAllDishes = async (db) => {
  const query = 'SELECT * FROM dishes';
  const results = await db.all(query, []);
  return { dishes: results };
};

const fetchDishesById = async (db, id) => {
  const query = 'SELECT * FROM dishes WHERE id = ?';
  const result = await db.all(query, [id]);

  if (result.length > 0) {
    return { dishes: result[0] };
  } else {
    return { dishes: {} };
  }
};

const filterDishes = async (db, isVeg) => {
  const query = 'SELECT * FROM dishes WHERE isVeg = ?';
  const result = await db.all(query, [isVeg]);

  return { dishes: result };
};

const sortDishesByPrice = async (db) => {
  const query = 'SELECT * FROM dishes ORDER BY price ASC';
  const result = await db.all(query, []);

  return { dishes: result };
};

module.exports = {
  fetchAllDishes,
  fetchDishesById,
  filterDishes,
  sortDishesByPrice,
};
