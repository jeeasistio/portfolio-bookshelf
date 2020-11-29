import handler from '@lib/handler'
import acceptRequest from '@lib/acceptRequest'
import rejectRequest from '@lib/rejectRequest'
import { getAllRequests } from '@lib/getRequests'

export default handler
.get((req, res) => {
  getAllRequests(req.query)
    .then(requests => res.json(requests))
    .catch(err => res.status(400).json({ msg: err.message }))
})
.patch((req, res) => {
  const { action, requestId, bookId, personId } = req.body;
  
  if (action === 'reject')
    return rejectRequest(requestId)
      .then(book => res.json(book))
      .catch(err => res.status(400).json({ msg: err.message }))
      
  acceptRequest(requestId, bookId, personId)
      .then(request => res.json(request))
      .catch(err => res.status(400).json({ msg: err.message }))
})