import React from 'react';
import { Container, Row, Col, ListGroup, ListGroupItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import { faGooglePlusG, faFacebookF, faInstagram, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const footerLinks1 = [
  {
    path: '/',
    display: 'Home'
  },
  {
    path: '/find-booking',
    display: 'Find Booking'
  },
  {
    path: '/login',
    display: 'Login'
  },
  {
    path: '/register',
    display: 'Register'
  },
];

const footerLinks2 = [
  {
    icon: <FontAwesomeIcon icon={faInstagram} />,
    path: 'https://instagram.com',
    display: 'Instagram'
  },
  {
    icon: <FontAwesomeIcon icon={faFacebookF} />,
    path: 'https://facebook.com',
    display: 'Facebook'
  },
  {
    icon: <FontAwesomeIcon icon={faLinkedinIn} />,
    path: 'https://linkedin.com',
    display: 'LinkedIn'
  },
];

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className='footer'>
      <Container>
        <Row>
          <Col lg='3' md='6'>
            <div className="logo">
              <img src='src/assets/images/23625ce4-8f56-4442-be94-19cebb728aca.jpg' alt="Logo" />
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, enim.</p>
              <div className="social__link d-flex align-items-center gap-3">
                {footerLinks2.map((item, index) => (
                  <span key={index}>
                    <a href={item.path} target="_blank" rel="noopener noreferrer">
                      {item.icon}
                    </a>
                  </span>
                ))}
              </div>
            </div>
          </Col>

          <Col lg='3' md='6'>
            <h5 className="footer__link-title">Quick Links</h5>
            <ListGroup className='footer__quick-links'>
              {footerLinks1.map((item, index) => (
                <ListGroupItem key={index} className='ps-0 border-0'>
                  <Link to={item.path}>{item.display}</Link>
                </ListGroupItem>
              ))}
            </ListGroup>
          </Col>

          <Col lg='3' md='6'>
            <h5 className="footer__link-title">Follow Us</h5>
            <ListGroup className='footer__quick-links'>
              {footerLinks2.map((item, index) => (
                <ListGroupItem key={index} className='ps-0 border-0'>
                  <a href={item.path} target="_blank" rel="noopener noreferrer">
                    {item.icon} {item.display}
                  </a>
                </ListGroupItem>
              ))}
            </ListGroup>
          </Col>

          <Col lg='3' md='6'>
            <h5 className="footer__link-title">Contact</h5>
            <ListGroup className='footer__quick-links'>
              <ListGroupItem className='ps-0 border-0 d-flex align-items-center gap-3'>
                <h6 className='mb-0 d-flex align-items-center gap-2'>
                  <span><i className='ri-map-pin-line'></i></span>
                  Address:
                </h6>
                <p className='mb-0'>18, Hoang Quoc Viet</p>
              </ListGroupItem>

              <ListGroupItem className='ps-0 border-0 d-flex align-items-center gap-3'>
                <h6 className='mb-0 d-flex align-items-center gap-2'>
                  <span><i className='ri-mail-line'></i></span>
                  Email:
                </h6>
                <p className='mb-0'>accom@gmail.com</p>
              </ListGroupItem>

              <ListGroupItem className='ps-0 border-0 d-flex align-items-center gap-3'>
                <h6 className='mb-0 d-flex align-items-center gap-2'>
                  <span><i className='ri-phone-fill'></i></span>
                  Phone:
                </h6>
                <p className='mb-0'>+84 98765432</p>
              </ListGroupItem>
            </ListGroup>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col lg='12' className='text-center'>
            <h5 className="footer__link-title">Newsletter</h5>
            <div className="newsletter">
              <input type="email" placeholder="Enter your email" />
              <button type="button">Subscribe</button>
            </div>
            <p className='copyright'>&copy; {year} All rights reserved || Made with ❤️ by Namlimo</p>
          </Col>
        </Row>
      </Container>
      <style jsx>{`
        .footer {
          background-color: #ffffff;
          color: #1a202c;
          padding-top: 70px;
          padding-bottom: 30px;
          border-top: 1px solid #e2e8f0;
        }

        .footer .logo img {
          width: 80px;
          height: 100px;
          margin-bottom: 1rem;
        }

        .footer .logo p {
          color: #4a5568;
          font-size: 1rem;
        }

        .social__link span a {
          text-decoration: none;
          color: #4a5568;
          font-size: 1.5rem;
          transition: color 0.3s;
        }

        .social__link span a:hover {
          color: #3182ce;
        }

        .footer__link-title {
          color: #1a202c;
          margin-bottom: 1rem;
          font-size: 1.25rem;
          font-weight: 600;
        }

        .footer__quick-links li a {
          text-decoration: none;
          color: #4a5568;
          font-size: 1.1rem;
          transition: color 0.3s;
        }

        .footer__quick-links a:hover {
          color: #3182ce;
        }

        .footer__quick-links h6 span i {
          color: #3182ce;
          font-size: 1.4rem;
        }

        .footer__quick-links h6 {
          margin-bottom: 1rem;
        }

        .footer__quick-links p {
          font-size: 1.1rem;
          color: #4a5568;
        }

        .newsletter {
          display: flex;
          justify-content: center;
          margin-top: 1rem;
          margin-bottom: 2rem;
        }

        .newsletter input {
          padding: 0.5rem;
          font-size: 1rem;
          border: 1px solid #e2e8f0;
          border-radius: 0.25rem 0 0 0.25rem;
          outline: none;
          width: 300px;
        }

        .newsletter button {
          padding: 0.5rem 1rem;
          font-size: 1rem;
          background-color: #3182ce;
          color: #fff;
          border: none;
          border-radius: 0 0.25rem 0.25rem 0;
          cursor: pointer;
          transition: background-color 0.3s;
        }

        .newsletter button:hover {
          background-color: #2c5282;
        }

        .copyright {
          color: #4a5568;
          font-size: 1.2rem;
          margin-top: 2rem;
        }
      `}</style>
    </footer>
  );
};

export default Footer;
