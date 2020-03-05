function getUser(id, list) {
    // iterate through list and return list item with matching id
    let item = list.filter( item => { return id === item.id });
    if(item.length === 0) {
        // console.log('setting item to blank')
        return {
            id: 0,
            username: ""
        }
    } 
    return item[0];
}

module.exports = getUser;