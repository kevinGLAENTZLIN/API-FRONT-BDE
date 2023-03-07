DROP DATABASE IF EXISTS BDE;
CREATE DATABASE BDE;

USE BDE;

CREATE TABLE inventaire
(
    name VARCHAR(50),
    number INT,
    reference VARCHAR(50),
    price FLOAT
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
