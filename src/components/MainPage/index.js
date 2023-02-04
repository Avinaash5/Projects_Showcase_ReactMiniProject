import {Component} from 'react'
import Loader from 'react-loader-spinner'

import './index.css'

const apiStatusConstants = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
  initial: 'INITIAL',
}

class MainPage extends Component {
  state = {
    projectsList: [],
    category: 'ALL',
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getProjects()
  }

  onSelectCategory = event => {
    this.setState({category: event.target.value}, this.getProjects)
  }

  getProjects = async () => {
    const {category} = this.state
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const apiUrl = `https://apis.ccbp.in/ps/projects?category=${category}`
    const options = {
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      const updatedData = data.projects.map(each => ({
        id: each.id,
        imageUrl: each.image_url,
        name: each.name,
      }))
      this.setState({
        projectsList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  onRetry = () => {
    this.getProjects()
  }

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" height={50} width={50} color="#328af2" />
    </div>
  )

  renderSuccessView = () => {
    const {projectsList} = this.state
    return (
      <ul className="project-cards-container">
        {projectsList.map(eachProject => (
          <li key={eachProject.id} className="project-list-item">
            <img
              src={eachProject.imageUrl}
              alt={eachProject.name}
              className="project-img"
            />
            <p>{eachProject.name}</p>
          </li>
        ))}
      </ul>
    )
  }

  renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/projects-showcase/failure-img.png"
        alt="failure view"
        className="failure-view-img"
      />
      <h1> Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button type="button" onClick={this.onRetry} className="retry-btn">
        Retry
      </button>
    </div>
  )

  renderProjectsView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    const {categoriesList} = this.props
    return (
      <div className="app-container">
        <div className="header-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/projects-showcase/website-logo-img.png"
            alt="website logo"
            className="website-logo"
          />
        </div>
        <select className="drop-down" onChange={this.onSelectCategory}>
          {categoriesList.map(eachCategory => (
            <option value={eachCategory.id}>{eachCategory.displayText}</option>
          ))}
        </select>
        {this.renderProjectsView()}
      </div>
    )
  }
}

export default MainPage
