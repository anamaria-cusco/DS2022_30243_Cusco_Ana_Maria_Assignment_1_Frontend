import Avatar from '../../assets/img/jpeg/avatar.jpg'
export default function Body() {
    return (
      <>
        <div
          className="page-features"
          xyz="fade flip-down stagger duration-10 delay-2 ease-out-back"
        >
          <div className="feature-item xyz-nested">
            <h1>KEEP TRACK OF YOUR ENERGY CONSUMPTION</h1>
          </div>
          <div className="feature-item xyz-nested">
          <h1>MANAGE YOUR SMART DEVICES</h1>
          </div>
          <div className="feature-item xyz-nested">
          <h1>VIEW REAL TIME CHARTS</h1>
          </div>
        </div>
        <div
        className="page-section"
        xyz="fade small stagger delay-4 ease-in-out"
>
        <div className="section-left" xyz="fade left stagger">
          <div className="section-item xyz-nested">
          <p>CLIENT: view devices, view daily consumption chart</p>
          </div>
          <div className="section-item xyz-nested">
          <p>ADMIN: manage devices and users</p>
          </div>
          <div className="section-item xyz-nested">
          <p>Login/Logout: multiple users</p>
          </div>
        </div>
        <div className="section-right xyz-nested" xyz="fade big delay-10">
        <div className="my-avatar-logo xyz-nested">
        <img
          src={Avatar}
          alt="author-img"
          className="hero-logo xyz-nested"
        />
        <h2> Developed by: Ana-Maria Cusco</h2>
        </div>
        </div>
    </div>
      </>
      
    );
  }