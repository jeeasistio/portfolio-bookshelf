import handler from '@lib/handler'
import { getUserBorrowed } from '@lib/getBooks'
import { getUserRequests } from '@lib/getRequests'

export default handler
.get((req, res) => {
  if (req.query.type === 'borrowed') {
    return getUserBorrowed(req.query, req.user)
      .then(books => res.json(books))
      .catch(err => res.status(400).json({ msg: err }))
  }
  getUserRequests(req.query, req.user)
    .then(requests => res.json(requests))
    .catch(err => res.status(400).json({ msg: err }))
})