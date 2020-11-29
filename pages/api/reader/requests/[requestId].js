import handler from '@lib/handler'
import cancelRequest from '@lib/cancelRequest'

export default handler
.delete((req, res) => {
  cancelRequest(req.query.requestId, req.user)
    .then(request => res.json(request))
    .catch(err => res.status(400).json({ msg: err.message }))
})