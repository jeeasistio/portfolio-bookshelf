import handler from '@lib/handler'
import { getAllBorrowed } from '@lib/getBooks'
import retrieveBook from '@lib/retrieveBook'

export default handler
.get((req, res) => {
  getAllBorrowed(req.query)
    .then(books => res.json(books))
    .catch(err => res.status(400).json({ msg: err }))
})
.patch((req, res) => {
  retrieveBook(req.body.bookId)
    .then(book => res.json(book))
    .catch(err => res.status(400).json({ msg: err }))
})