import { useSelector } from 'react-redux'

const Notification = () => {
  const { type, message } = useSelector((state) => state.notification)
  if (!message) {
    return null
  }

  return <div className={type}>{message}</div>
}

export default Notification
