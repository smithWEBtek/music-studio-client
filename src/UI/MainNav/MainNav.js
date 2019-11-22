import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import './MainNav.css'
import LogoSpin from '../../assets/images/LogoSpin.png'
import Logo from '../../assets/images/Logo.png'
import { Container, Collapse, Navbar, NavbarToggler, Nav } from 'reactstrap'

class MainNav extends Component {
  constructor(props) {
    super(props)

    this.toggle = this.toggle.bind(this)
    this.state = {
      isOpen: false
    }
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  render() {
    return (
      <Container>
        <Navbar className="MainNav" light expand="md">
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav navbar>
              <Link to='/students' className="Item">students</Link>
              <Link to='/teachers' className="Item">teachers</Link>
              <Link to='/resources' className="Item">resources</Link>
              <Link to='/lessons' className="Item">lessons</Link>
              {/* <Link to='/lesson_resources' className="Item">lessonsResources</Link> */}
            </Nav>
          </Collapse>
          <div className="logo-home">
            <Link to='/'>
              music
                <img src={LogoSpin} height="60px" className="LogoSpin" alt=" app-logo" />
              studio
              </Link>
          </div>
          <NavbarToggler onClick={this.toggle} />
        </Navbar >
        <div>
          <Route path="/" exact render={() => (
            <div>
              <div className="Center">
                <br />
                <h5>Welcome!</h5>
                <h5>Ready to play some music?</h5>
                <img src={Logo} height="150px" className="Logo" alt=" app-logo" /> <br />
                <h3>II III II III II III II III II III II III II</h3>
              </div>
              <div><hr /> <hr /> <hr /> <hr /> <hr /></div>
              <div>
                <h4>This app allows Teachers and Students to: </h4>
                <ul>
                  <li>
                    Keep track of assigned Resources in a music Lesson,
                </li>
                  <li>
                    Have ready access to those Resources in 3 formats: PDF, Audio and Video
                </li>
                  <li>
                    Create Retrieve Update and Delete:  Teacher, Student, Resource, Lesson
                </li>
                  <li>
                    Toggle active / inactive for Teacher or Student
                  </li>
                </ul>
                <h4>All resources are cloud based </h4>
                <ul>
                  <li>
                    PDF files are on <a href="https://cloudinary.com">Cloudinary</a>
                  </li>
                  <li>
                    Audio files are on <a href="https://soundcloud.com">SoundCloud</a>
                  </li>
                  <li>
                    Video files are on <a href="https://www.youtube.com/user/bradsmithpiano">YouTube</a>
                  </li>
                </ul>
              </div>
            </div>
          )} />
        </div>
      </Container >
    )
  }
}

export default MainNav