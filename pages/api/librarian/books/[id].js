import handler from '@lib/handler'
import deleteBook from '@lib/deleteBook'

export default handler
.delete((req, res) => {
  deleteBook(req.query.id)
    .then(book => res.json(book))
    .catch(err => res.status(400).json({ msg: err.message }))
})