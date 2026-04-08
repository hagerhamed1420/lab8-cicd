db = db.getSiblingDB('lab6db');

db.tasks.drop();

db.tasks.insertMany([
  { id: 1, name: 'Milk',         status: 'pending' },
  { id: 2, name: 'Eggs',         status: 'pending' },
  { id: 3, name: 'Bread',        status: 'pending' },
  { id: 4, name: 'Butter',       status: 'done'    },
  { id: 5, name: 'Orange juice', status: 'done'    },
  { id: 6, name: 'Tea',          status: 'pending' }
]);

print('lab6db seeded with 6 tasks');