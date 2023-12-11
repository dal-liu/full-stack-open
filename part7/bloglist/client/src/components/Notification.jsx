import { useSelector } from 'react-redux'
import { Alert } from 'react-bootstrap'

const Notification = () => {
  const { type, message } = useSelector((state) => state.notification)

  return <div>{message && <Alert variant={type}>{message}</Alert>}</div>
}

export default Notification
