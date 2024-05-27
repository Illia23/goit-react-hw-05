import error from './ErrorMessage.module.css';
const ErrorMessage = () => {
  return (
      <div className={error.container}>
          <p className={error.text}>Whoops, something went wrong! Please try reloading this page!</p>
     </div>
  )
}

export default ErrorMessage;