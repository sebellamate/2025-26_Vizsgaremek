CREATE TABLE Vevo (
    vevo_id INT AUTO_INCREMENT PRIMARY KEY,
    vnev VARCHAR(100) NOT NULL,
    knev VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    telefon VARCHAR(20),
    cim VARCHAR(255),
    jelszo_hash VARCHAR(255) NOT NULL,
    regisztracio_datuma DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Kategoria (
    kategoria_id INT AUTO_INCREMENT PRIMARY KEY,
    nev VARCHAR(50) NOT NULL,
    szulo_kategoria_id INT,
    FOREIGN KEY (szulo_kategoria_id) REFERENCES Kategoria(kategoria_id) ON DELETE SET NULL
);

CREATE TABLE Termek (
    termek_id INT AUTO_INCREMENT PRIMARY KEY,
    nev VARCHAR(100) NOT NULL,
    leiras TEXT,
    ar DECIMAL(10, 2) NOT NULL,
    kep_url VARCHAR(255),
    kategoria_id INT,
    FOREIGN KEY (kategoria_id) REFERENCES Kategoria(kategoria_id) ON DELETE SET NULL
);

CREATE TABLE Rendeles (
    rendeles_id INT AUTO_INCREMENT PRIMARY KEY,
    vevo_id INT NOT NULL,
    rendeles_datuma DATETIME DEFAULT CURRENT_TIMESTAMP,
    statusz ENUM('uj', 'feldolgozas', 'fizetve', 'szallitva', 'torolve') DEFAULT 'uj',
    osszar DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (vevo_id) REFERENCES Vevo(vevo_id) ON DELETE CASCADE
);

CREATE TABLE RendelesTetel (
    id INT AUTO_INCREMENT PRIMARY KEY,
    rendeles_id INT NOT NULL,
    termek_id INT NOT NULL,
    mennyiseg INT NOT NULL CHECK (mennyiseg > 0),
    egyseg_ar DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (rendeles_id) REFERENCES Rendeles(rendeles_id) ON DELETE CASCADE,
    FOREIGN KEY (termek_id) REFERENCES Termek(termek_id) ON DELETE CASCADE
);

CREATE TABLE Fizetes (
    fizetes_id INT AUTO_INCREMENT PRIMARY KEY,
    rendeles_id INT NOT NULL,
    osszeg DECIMAL(10, 2) NOT NULL,
    `mod` ENUM('kartya', 'atutalas', 'utanvet') NOT NULL,
    datum DATETIME DEFAULT CURRENT_TIMESTAMP,
    statusz ENUM('sikeres', 'sikertelen', 'fuggoben') DEFAULT 'fuggoben',
    FOREIGN KEY (rendeles_id) REFERENCES Rendeles(rendeles_id) ON DELETE CASCADE
);

CREATE TABLE Szallitas (
    szallitas_id INT AUTO_INCREMENT PRIMARY KEY,
    rendeles_id INT NOT NULL,
    cim VARCHAR(255) NOT NULL,
    varos VARCHAR(100) NOT NULL,
    iranyitoszam VARCHAR(10) NOT NULL,
    szallito_mod ENUM('futár', 'posta', 'csomagpont') NOT NULL,
    FOREIGN KEY (rendeles_id) REFERENCES Rendeles(rendeles_id) ON DELETE CASCADE
);






------------------------------------------------------------------------------------------------------------------------------------------------------------------------------






-- Vevo
INSERT INTO Vevo (nev, email, telefon, cim, jelszo_hash)
VALUES
('Kovács János', 'janos.kovacs@example.com', '06701234567', 'Budapest, Fő utca 12', 'hash123'),
('Nagy Anna', 'anna.nagy@example.com', '06707654321', 'Debrecen, Kossuth tér 5', 'hash456');

-- Kategoria
INSERT INTO Kategoria (nev, szulo_kategoria_id)
VALUES
('Elektronika', NULL),
('Mobiltelefonok', 1),
('Számítástechnika', 1),
('Ruházat', NULL),
('Férfi ruházat', 4),
('Női ruházat', 4);

-- Termek
INSERT INTO Termek (nev, leiras, ar, kep_url, kategoria_id)
VALUES
('iPhone 14', 'Apple iPhone 14 128GB fekete', 350000.00, 'https://example.com/iphone14.jpg', 2),
('Dell Laptop', 'Dell Inspiron 15 5000 sorozat', 200000.00, 'https://example.com/dell_laptop.jpg', 3),
('Férfi póló', 'Kényelmes pamut póló', 4000.00, 'https://example.com/ferfi_polo.jpg', 5),
('Női kabát', 'Vízálló női kabát', 15000.00, 'https://example.com/noi_kabat.jpg', 6);

-- Rendeles
INSERT INTO Rendeles (vevo_id, statusz, osszar)
VALUES
(1, 'uj', 355000.00),
(2, 'feldolgozas', 19000.00);

-- RendelesTetel
INSERT INTO RendelesTetel (rendeles_id, termek_id, mennyiseg, egyseg_ar)
VALUES
(1, 1, 1, 350000.00),
(1, 3, 1, 4000.00),
(2, 4, 1, 15000.00),
(2, 3, 1, 4000.00);

-- Fizetes
INSERT INTO Fizetes (rendeles_id, osszeg, `mod`, statusz)
VALUES
(1, 355000.00, 'kartya', 'sikeres'),
(2, 19000.00, 'atutalas', 'fuggoben');

-- Szallitas
INSERT INTO Szallitas (rendeles_id, cim, varos, iranyitoszam, szallito_mod)
VALUES
(1, 'Budapest, Fő utca 12', 'Budapest', '1011', 'futár'),
(2, 'Debrecen, Kossuth tér 5', 'Debrecen', '4024', 'posta');

