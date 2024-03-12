import './Footer.scss'

function Footer() {
  return (
  <div className="footer container">
    <a href="http://frog2tog.com">
      <img className="logo" src="/logo.png"/>
    </a>
    <div>
      Contact: <a href="mailto:info@frog2tog.com">info@frog2tog.com</a>
    </div>
  </div>
  );
}

export default Footer;
