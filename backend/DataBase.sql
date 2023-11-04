SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";
-- Table structure for table affichage
CREATE TABLE Etudiants (
   id INT ,
    prenom VARCHAR(50) NOT NULL,
    nom VARCHAR(50) NOT NULL,
    date_naiss DATE,
    cin int (8),
    email VARCHAR(50) UNIQUE,
    password VARCHAR(255),
    photo_identite VARCHAR(255),
    createdAt DATETIME NOT NULL,
    updatedAt DATETIME NOT NULL,
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
   cin int(8),
   module varchar(50),
   coeff float(4),
   email VARCHAR(50) UNIQUE,
   password VARCHAR(255),
   createdAt DATETIME NOT NULL,
   updatedAt DATETIME NOT NULL,
   PRIMARY KEY (id_ens, email)
);


ALTER TABLE Enseignants
  MODIFY id_ens INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;
COMMIT;