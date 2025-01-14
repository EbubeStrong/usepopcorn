const ErrorMessage = ({ className = "error", message = "An error occurred" }) => {
  return (
    <div className={className}>⛔ {message}</div>
  )
}

export default ErrorMessage