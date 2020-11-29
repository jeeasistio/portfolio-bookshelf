import handler from '@lib/handler'
import { getAllBooks } from '@lib/getBooks'

export default handler
.get((req, res) => {
  getAllBooks(req.query)
    .then(books => res.json(books))
    .catch(err => res.status(400).json({ msg: err.message }))
})