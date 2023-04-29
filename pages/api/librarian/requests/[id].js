import handler from '@lib/handler'
import deleteRequest from '@lib/deleteRequest'

export default handler
.delete((req, res) => {
  deleteRequest(req.query.id)
    .then(request => res.json(request))
    .catch(err => res.status(400).json({ msg: err.message }))
})