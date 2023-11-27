SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";
-- Table structure for table affichage
CREATE TABLE Etudiants (
   id INT ,
    nom VARCHAR(50) NOT NULL,
    prenom VARCHAR(50) NOT NULL,
    date_naiss DATE,
    cin int (8),
    photo_identite VARCHAR(255),
    email VARCHAR(50) UNIQUE,
    password VARCHAR(255),
    createdAt DATETIME NOT NULL,
    updatedAt DATETIME NOT NULL,
    isArchived TINYINT(1) NOT NULL DEFAULT 0,
   PRIMARY KEY (id, email)
);

-- AUTO_INCREMENT for table Etudiants
ALTER TABLE Etudiants
  MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;
COMMIT;

   
  
CREATE TABLE Enseignants (
   id_ens INT NOT NULL ,
   nom VARCHAR(50),
   prenom VARCHAR(50),
    DateNaissance DATE,
   Genre VARCHAR(10),
   cin int(8),
   email VARCHAR(50) UNIQUE,
   password VARCHAR(255),
   createdAt DATETIME NOT NULL,
   updatedAt DATETIME NOT NULL,
    isArchived TINYINT(1) NOT NULL DEFAULT 0,
   PRIMARY KEY (id_ens, email)
);


ALTER TABLE Enseignants
  MODIFY id_ens INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;
COMMIT;
ALTER TABLE Enseignants
MODIFY COLUMN Genre VARCHAR(10) CHECK (Genre IN ('homme', 'femme'));
COMMIT;

CREATE TABLE Modules (
  id_module INT NOT NULL,
  nom_matiere VARCHAR(50),
  coefficient float,
  id_ens INT NOT NULL ,
     createdAt DATETIME NOT NULL,
   updatedAt DATETIME NOT NULL,
    isArchived TINYINT(1) NOT NULL DEFAULT 0,
   PRIMARY KEY (id_module),
   FOREIGN KEY (id_ens) REFERENCES Enseignants (id_ens)
);

ALTER TABLE Module
MODIFY id_module INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;
COMMIT;

CREATE TABLE Notes (
  id_note INT NOT NULL,
  id_module INT NOT NULL,
  id_ens INT NOT NULL ,
  id INT NOT NULL,
  note_ds1 float,
  note_ds2 float,
  note_examen float,
  note_tp float,
  PRIMARY KEY (id_note),
   FOREIGN KEY (id_ens) REFERENCES Enseignants (id_ens),
   FOREIGN KEY (id) REFERENCES Etudiants (id),
   FOREIGN KEY (id_module) REFERENCES Module (id_ens)
);
ALTER TABLE Module
MODIFY id_note INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;
COMMIT;


CREATE TABLE Administrateurs (
   id_adm INT NOT NULL ,
   nom VARCHAR(50),
   prenom VARCHAR(50),
   email VARCHAR(50) UNIQUE,
   password VARCHAR(255),
   createdAt DATETIME NOT NULL,
   updatedAt DATETIME NOT NULL,
   PRIMARY KEY (id_adm, email)
);

ALTER TABLE Administrateurs
  MODIFY id_adm INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;
COMMIT;


CREATE TABLE Matieres (
  id_matiere INT ,
  nom_matiere VARCHAR(100) NOT NULL,
  contenu TEXT,
  coefficient INT,
  id_ens INT(11),
  type_matiere VARCHAR(10) CHECK (type_matiere IN ('TP', 'cours')),
   createdAt DATETIME NOT NULL,
   updatedAt DATETIME NOT NULL,
  PRIMARY KEY (id_matiere,nom_matiere),
   FOREIGN KEY (id_ens) REFERENCES Enseignants (id_ens)
 

  
);
ALTER TABLE Matieres
  MODIFY id_matiere INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;
COMMIT;




CREATE TABLE Notes (
  id_note INT NOT NULL,
  id_matiere INT NOT NULL,
  id_ens INT NOT NULL ,
  id INT NOT NULL,
  note_ds1 float,
  note_examen float,
  note_tp float,
   createdAt DATETIME NOT NULL,
   updatedAt DATETIME NOT NULL,
  PRIMARY KEY (id_note),
   FOREIGN KEY (id_ens) REFERENCES Enseignants (id_ens),
   FOREIGN KEY (id) REFERENCES Etudiants (id),
   FOREIGN KEY (id_matiere) REFERENCES matieres (id_matiere)
);
ALTER TABLE Notes
MODIFY id_note INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;
COMMIT;


