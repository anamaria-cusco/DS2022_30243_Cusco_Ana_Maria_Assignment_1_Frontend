import Logo from '../../assets/img/jpeg/logo.png'
export default function Header() {
    return (
      <div className="page-hero" xyz="fade small stagger ease-out-back duration-30">
        
        <div className="hero-logo xyz-nested">
        <img
          src={Logo}
          alt="logo-img"
          className="hero-logo xyz-nested"
        />
        </div>
      
        <p className="hero-text xyz-nested">
          Energy Utility Platform
        </p>
      </div>
    );
} 