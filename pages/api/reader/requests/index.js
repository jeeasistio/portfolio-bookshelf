import handler from '@lib/handler'
import makeRequest from '@lib/makeRequest'

export default handler
.post((req, res) => {
  makeRequest(req.body.bookId, req.user)
    .then(request => res.json(request))
    .catch(err => res.status(400).json({ msg: err.message }))
})