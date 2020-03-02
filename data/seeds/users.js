exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('users').del()
      .then(function () {
        // Inserts seed entries
        return knex('users').insert([
          {username: 'hillman', password: 'hilly', userType: 0},
          {username: 'jimbob', password: 'pass', userType: 1},
          {username: 'jacques', password: 'pass', userType: 0},
          {username: 'nathaniel', password: 'nate', userType: 1},
          {username: 'bob', password: 'bobby', userType: 0},
          {username: 'michael', password: 'pass', userType: 0},
          {username: 'tester2', password: 'tester2', userType: 1},
          {username: 'nowhere', password: 'no', userType: 1},
          {username: 'israel', password: 'pass', userType: 1},
          {username: 'hudson', password: 'pass', userType: 0},
          {username: 'john', password: 'pass', userType: 1},
          {username: 'branden', password: 'pass', userType: 0},
          {username: 'jacob', password: 'pass', userType: 0},
          {username: 'leroyce', password: 'pass', userType: 1},
        ]);
      });
  };
  