import handler from '@lib/handler'
import nookies from 'nookies'

export default handler
.post((req, res) => {
  nookies.destroy({ res }, 'auth-token', { path: '/' })
  nookies.destroy({ res }, 'user-role', { path: '/' })
  res.json({ msg: 'Logged Out '})
})