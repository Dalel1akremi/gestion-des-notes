SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";
-- Table structure for table `affichage`
CREATE TABLE Etudiants (
   id INT AUTO_INCREMENT PRIMARY KEY,
    prenom VARCHAR(50) NOT NULL,
    nom VARCHAR(50) NOT NULL,
    date_naiss DATETIME,
    cin int (8),
    email VARCHAR(50) UNIQUE,
    password VARCHAR(255),
    photo_identite LONGBLOB,
    type_mime VARCHAR(50),
    date_inscription DATETIME
    createdAt DATETIME NOT NULL,
    updatedAt DATETIME NOT NULL,
   PRIMARY KEY (id, email)
);

-- AUTO_INCREMENT for table `Etudiants`
ALTER TABLE `Etudiants`
  MODIFY `id` INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;
COMMIT;
   
   
   --enseignants--
CREATE TABLE Enseingnants (
   id_ens INT(11) NOT NULL AUTO_INCREMENT,
   nom VARCHAR(50),
   prenom VARCHAR(50),
   cin in(8),
   module varchar(50),
   coeff float(4),
   email VARCHAR(50) UNIQUE,
   password VARCHAR(255),
   createdAt DATETIME NOT NULL,
   updatedAt DATETIME NOT NULL,
   PRIMARY KEY (id_ens, email)
);

-- AUTO_INCREMENT for table `users`
ALTER TABLE `Enseignants`
  MODIFY `id_ens` INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;
COMMIT;