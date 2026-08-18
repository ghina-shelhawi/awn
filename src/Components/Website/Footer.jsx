import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faEnvelope,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebookF,
  faTwitter,
  faInstagram,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import "./footer.css";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="custom-footer">
      <Container className="py-4">
        <Row className="g-4">
          <Col lg={4} md={12} className="text-right">
            <h4 className="footer-logo fw-bold mb-3 mt-3">عَون</h4>
            <p className="footer-about text-white small lh-lg">
              منصتك الموثوقة للوصول إلى أمهر الحرفيين في مختلف المجالات. نجمع لك
              العروض ونضمن لك الجودة والسرعة في التنفيذ بكل سهولة وأمان.
            </p>
          </Col>

          <Col lg={4} md={6} className="text-right ">
            <h5 className="footer-title fw-bold mb-3 ">روابط سريعة:</h5>
            <div className="list-unstyled footer-links d-flex flex-column gap-2 small">
              <li>
                <a href="#requests">إدارة الطلبات</a>
              </li>
              <li>
                <a href="#profile">الملف الشخصي</a>
              </li>
              <li>
                <a href="#about">عن منصة عون</a>
              </li>
              <li>
                <a href="#terms">الشروط والأحكام</a>
              </li>
            </div>
          </Col>

          <Col lg={3} md={6} className="text-right">
            <h5 className="footer-title fw-bold mb-3">تواصل معنا</h5>
            <div className="list-unstyled footer-contact d-flex flex-column gap-3 small text-muted mb-4">
              <li className="d-flex align-items-center gap-2">
                <FontAwesomeIcon
                  icon={faMapMarkerAlt}
                  className="footer-icon-gold"
                />
                <span>الجمهورية العربية السورية</span>
              </li>
              <li className="d-flex align-items-center  gap-2">
                <FontAwesomeIcon
                  icon={faPhone}
                  className="footer-icon-gold text-right"
                />
                <span dir="ltr">+966 50 000 0000</span>
              </li>
              <li className="d-flex align-items-center gap-2">
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className="footer-icon-gold"
                />
                <span>support@awn.com</span>
              </li>
            </div>

            <div className="d-flex gap-2 justify-content-start">
              <NavLink href="#" className="social-circle text-center">
                <FontAwesomeIcon icon={faWhatsapp} />
              </NavLink>
              <NavLink className="social-circle text-center">
                <FontAwesomeIcon icon={faInstagram} />
              </NavLink>
              <NavLink className="social-circle text-center">
                <FontAwesomeIcon icon={faTwitter} />
              </NavLink>
              <NavLink className="social-circle text-center">
                <FontAwesomeIcon icon={faFacebookF} />
              </NavLink>
            </div>
          </Col>
        </Row>

        <hr className="footer-hr opacity-10 mt-2 mb-4" />

        <Row className="align-items-center justify-content-between text-white small footer-bottom">
          <Col md={12} className="text-center text-md-right mb-2 mb-md-0">
            &copy; {new Date().getFullYear()} منصة عون. جميع الحقوق محفوظة
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
