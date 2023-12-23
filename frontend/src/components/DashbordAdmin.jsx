import React, { useState, useEffect } from 'react';
import { Navbar, Button, Form, FormControl } from 'react-bootstrap';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Sidebar from 'react-sidebar';

const CollapsibleNavbar = () => {
  const [currentDateTime, setCurrentDateTime] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const today = new Date();
  const endOfDay = new Date(today);
  endOfDay.setHours(23, 59, 59, 999); // Définir la fin de la journée

  const items = [
    {
      id: 1,
      group: 'Aujourd\'hui',
      title: 'Événement',
      start_time: today,
      end_time: endOfDay,
    },
  ];

  const groups = [{ id: 'Aujourd\'hui', title: 'Aujourd\'hui' }];

  useEffect(() => {
    // Fonction pour obtenir la date et l'heure d'aujourd'hui
    const getTodayDateTime = () => {
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: false };
      return today.toLocaleDateString('fr-FR', options);
    };

    // Met à jour l'état avec la date et l'heure d'aujourd'hui lors du montage du composant
    setCurrentDateTime(getTodayDateTime());
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div>
      <Sidebar
        sidebar={
          <div>
            <button className="btn btn-light">
              <a href="/AfficheEtu">Dashbord</a>
            </button>
           <div> <button className="btn btn-light">
              <a href="/AfficheEns">Enseignant</a>
            </button></div>
            <div> <button className="btn btn-light">
              <a href="/AfficheEtu">Etudiant</a>
            </button></div>
            <button className="btn btn-light">
              <a href="/AfficheMatiere">Matiere</a>
            </button>
            <div>
            <button className="btn btn-light">
              <a href="/AfficheMatiere">Parametre</a>
            </button>
          </div>
          <div>
           <button className="btn btn-light">
           <a href="/AfficheMatiere">Message</a>
         </button>
       </div>
       <div>
           <button className="btn btn-light">
           <a href="/Home">Deconnexion</a>
         </button>
       </div>
          </div>
        }
        open={sidebarOpen}
        onSetOpen={toggleSidebar}
        styles={{ sidebar: { background: 'white', width: '200px' } }}
      >
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand>
            <Button
              variant="dark"
              onClick={toggleSidebar}
              aria-controls="navbarToggleExternalContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <div className="navbar-toggler-icon" />
            </Button>
          </Navbar.Brand>
          <Form className="d-flex ml-auto">
            <FormControl type="search" placeholder="Search" aria-label="Search" className="mr-2" />
            <Button variant="outline-info">Recherche</Button>
          </Form>
        </Navbar>
        <div className="card text-center">
          <div className="card-header">Dashboard Admin</div>
        </div>
        <div>
          <h4>Calendrier d'aujourd'hui : {currentDateTime}</h4>
          <Calendar
            groups={groups}
            items={items}
            defaultTimeStart={today}
            defaultTimeEnd={endOfDay}
            sidebarWidth={0}
            lineHeight={50}
            itemHeightRatio={0.75}
          />
        </div>
      </Sidebar>
    </div>
  );
};

export default CollapsibleNavbar;
