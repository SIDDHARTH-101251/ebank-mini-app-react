import './index.css'

const NotFound = () => (
  <div className="not-found-container">
    <img
      src="https://assets.ccbp.in/frontend/react-js/ebank-not-found-img.png"
      alt="not found"
      className="not-found-image"
    />
    <h1 className="not-found-first-text">Page Not Found</h1>
    <p className="not-found-second-text">
      We are sorry, the page you requested could not be found.
    </p>
  </div>
)

export default NotFound
