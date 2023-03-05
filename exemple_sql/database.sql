DROP DATABASE IF EXISTS BDE;
CREATE DATABASE BDE;

USE BDE;

CREATE TABLE inventaire
(
    nom VARCHAR(50),
    nombres INT,
    référence VARCHAR(50),
    prix FLOAT
);

CREATE TABLE utilisateur
(
    name VARCHAR(50),
    nom VARCHAR(50),
    years INT,
    accesToken TEXT(1000),
    password TEXT(1000),
    law INT
);
