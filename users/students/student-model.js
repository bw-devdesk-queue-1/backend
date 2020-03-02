const db = require('../../data/dbConfig.js')
module.exports = {
    find,
    findById,
    add,
    update,
    remove,
    findBy
}

function find(){
    return db('tickets')
}

function findById(id) {
    return db('tickets')
    .where({id})
    .first()
}

function add(ticket) {
    return db('tickets')
    .insert(ticket, 'id')
}

function update(changes, id) {
    return db('tickets')
    .where({id})
    .update(changes)
}

function remove(id) {
    return db("tickets")
    .where({id})
    .del()
}

function findBy(filter) {
    return db('tickets')
      .where(filter);
  }