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