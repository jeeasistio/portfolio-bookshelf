import handler from '@lib/handler'
import addBook from '@lib/addBook'

export default handler
.post((req, res) => {
  addBook(req.body)
    .then(book => res.json(book))
    .catch(err => res.status(400).json({ msg: err.message }))
})