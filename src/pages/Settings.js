import React from 'react';

class Settings extends React.Component {
  render() {
    return (
      <div className="settings-container">
        <img
          id="icon-config-img"
          src="https://img.icons8.com/ios-filled/344/automatic.png"
          alt="icon-config"
        />
        <h1 data-testid="settings-title">Configurações</h1>
      </div>
    );
  }
}

export default Settings;
