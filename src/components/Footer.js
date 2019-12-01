import React from 'react';

export default () => (
  <div id="footer">
    <div className="inner">
      <ul className="icons">
        <li>
          <a
            href="https://www.facebook.com/jan.krapac"
            className="icon fa fa-facebook-square"
          >
            <span className="label">Facebook</span>
          </a>
        </li>
        <li>
          <a
            href="https://jankc.tumblr.com/"
            className="icon fa fa-tumblr-square"
          >
            <span className="label">Tumblr</span>
          </a>
        </li>
        <li>
          <a href="mailto:jan.krapac@gmail.com" className="icon fa-envelope-square">
            <span className="label">Email</span>
          </a>
        </li>
      </ul>
      {/* <ul className="copyright">
                        <li>&copy; Gatsby Starter Strata</li><li>Design: <a href="http://html5up.net">HTML5 UP</a></li>
                    </ul> */}
    </div>
  </div>
);
