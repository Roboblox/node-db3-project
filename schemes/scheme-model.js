// user-model
const db = require("../data/db-config.js");

module.exports = {
  find() {
    return db("schemes")
  },
  findById(id) {
    return db("schemes").where({ id }).first()
  },
  create(user) {
    const [id] = db("schemes").insert(user)
    return db('schemes').where({ id }).first()
  },
  findSteps(id) {
    
    return db('steps as u')
      .join('posts as p', 'u.id', 'p.user_id')
      .select('u.username', 'p.contents')
      .where({ 'u.id': id })
  },
  async update(id, changes) {
    const count = await db("schemes").where({ id }).update(changes)
    if (count) {
      return db('schemes').where({ id }).first()
    } else {
      return Promise.resolve(null)
    }
  },
   remove(id) {
    const user = await db('schemes').where({ id }).first()
    if (!user) return Promise.resolve(null)
    await db("schemes").where({ id }).del()
    return Promise.resolve(user)
  }
}
// select
//     p.productname as 'Product Name',
//     s.companyname as 'Supplier Name',
//     c.categoryname as 'Category',
//     p.unitprice as 'Unit Price'
// from Product as p
// join Supplier as s
//     on p.supplierid = s.id
// join Category as c
//     on p.CategoryId = c.id
// order by p.unitprice desc;