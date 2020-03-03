
exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('tickets').truncate()
      .then(function () {
        // Inserts seed entries
        return knex('tickets').insert([
          {title: "I can't run create-react-app", description: "I'm getting an error when i try to run cra", tried: "I haven't tried anything", category: "React"},
          {title: "Git won't let me make pushes", description: "I'm getting an error when i try to push to my repo", tried: "I've read some stuff on the internet about it", category: "Git"},
          {title: "What are higher order functions?", description: "I don't understand higher order functions", tried: "I've watched a few videos about it but they haven't explained things in a way that I understood", category: "Javascript"},
          {title: "My database query won't work", description: "I'm getting a syntax error but my code is identical to the examples from class", tried: "I've tried to change the text but that hasn't helped at all", category: "SQL"},
          {title: "I can't see my console logs", description: "My console logs are not appearing in my browser when I'm running my react app", tried: "I've tried to change the text but that hasn't helped at all", category: "React"},
          {title: "My brain won't work", description: "I", tried: "I've tried to think", category: "JavaScript"}
        ]);
      });
  };