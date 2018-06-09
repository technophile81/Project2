CREATE DATABASE vetPTSDapp;

USE vetPTSDapp;

CREATE TABLE User (
userId INTEGER NOT NULL AUTO_INCREMENT,
name VARCHAR(255) NOT NULL,
bio TEXT NOT NULL,
createdAt DATETIME NOT NULL,
PRIMARY KEY (userId)
);

CREATE TABLE Credential (
credentialId INTEGER NOT NULL AUTO_INCREMENT,
userId INTEGER NOT NULL,
credSource VARCHAR(255) NOT NULL,
sourceUID VARCHAR(255) NOT NULL,
PRIMARY KEY (credentialId)
);

CREATE TABLE Category (
categoryId INTEGER NOT NULL AUTO_INCREMENT,
categoryName VARCHAR(255) NOT NULL,
PRIMARY KEY (categoryId)
);

CREATE TABLE Thread (
    threadId INTEGER NOT NULL AUTO_INCREMENT,
    threadTitle VARCHAR(255) NOT NULL,
    userId INTEGER NOT NULL,
    categoryId INTEGER NOT NULL,
    createdAt DATETIME NOT NULL,
    PRIMARY KEY (threadId)
);

CREATE TABLE Post (
    postId INTEGER NOT NULL AUTO_INCREMENT,
    threadId INTEGER NOT NULL,
    postTitle VARCHAR(255) NOT NULL,
    userId INTEGER NOT NULL,
    postContent TEXT NOT NULL,
    createdAt DATETIME NOT NULL,
    deleted BOOLEAN NOT NULL,
    PRIMARY KEY (postId)
);
-- Flag post

CREATE TABLE Subscription (
    -- UserID/ThreadID are a composite primary key
    -- (there can never be more than one entry in
    -- this table for any such pair)
    userId INTEGER NOT NULL,
    threadId INTEGER NOT NULL,
    createdAt DATETIME NOT NULL,
    PRIMARY KEY (userId,threadId)
);
CREATE TABLE Event (
    eventId INTEGER NOT NULL AUTO_INCREMENT,
    
    PRIMARY KEY (eventId)
);