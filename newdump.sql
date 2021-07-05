-- tables
CREATE TABLE `users` (
  `user_id` varchar(25) DEFAULT uuid() PRIMARY KEY,
  `first_name` varchar(255) default NULL,
  `last_name` varchar(255) default NULL,
  `email` varchar(255) default NULL,
  PRIMARY KEY (`id`)
) 
CREATE TABLE `transfers` (
   `transactionID` varchar(25) DEFAULT uuid() PRIMARY KEY,
   `senderID` varchar(25) DEFAULT uuid(),
   `receiverID` varchar(25) DEFAULT uuid(),
   `value` int(50) DEFAULT 0,
   `time` datetime DEFAULT current_timestamp()
)

CREATE TABLE `curr_balance` (
    `user_id` varchar(25) DEFAULT uuid() PRIMARY KEY,
    `balance` int(50) DEFAULT 0
)
-- -- Here senderID refers to the person sending Money
-- CREATE TABLE `sent` (
--    `senderID` varchar(25) DEFAULT uuid() PRIMARY KEY,
--    `receiverID` varchar(25) DEFAULT uuid(),
--    `value` int(50) DEFAULT 0,
--    `time` datetime DEFAULT current_timestamp()
-- )
-- -- Here receiverID refers to the person getting Money
-- CREATE TABLE `received` (
--    `receiverID` varchar(25) DEFAULT uuid() PRIMARY KEY,
--    `senderID` varchar(25) DEFAULT uuid(),
--    `value` int(50) DEFAULT 0,
--    `time` datetime DEFAULT current_timestamp()
-- )

--Foreign keys
ALTER TABLE `users` ADD FOREIGN KEY(user_id) REFERENCES transfers(senderID)


--Triggers

CREATE TRIGGER `initialize_user_account` AFTER INSERT ON `users` FOR EACH ROW BEGIN INSERT INTO transfers(senderID,receiverID,value) VALUES ('BANK-2b9d-42d9-a4cd',new.user_id,10000); INSERT INTO curr_balance(user_id,balance) VALUES (new.user_id,10000); END;

--
-- DUMMY DATA
INSERT INTO users (first_name,last_name,email,curr_balance) VALUES ('Vanessa','Brown','vanessa.brown@email.com',10000);      
INSERT INTO users (first_name,last_name,email,curr_balance) VALUES ('Phyllis','Burns','phyllis.burns@email.com',10000);      
INSERT INTO users (first_name,last_name,email,curr_balance) VALUES ('David','Loggains','david.loggains@email.com',10000);    
INSERT INTO users (first_name,last_name,email,curr_balance) VALUES ('Timothy','Dortch','timothy.dortch@email.com',10000);    
INSERT INTO users (first_name,last_name,email,curr_balance) VALUES ('Vanessa','Escudero','vanessa.escudero@email.com',10000);
INSERT INTO users (first_name,last_name,email,curr_balance) VALUES ('Wayne','Thompson','wayne.thompson@email.com',10000);    
INSERT INTO users (first_name,last_name,email,curr_balance) VALUES ('Gladys','Hunt','gladys.hunt@email.com',10000);
INSERT INTO users (first_name,last_name,email,curr_balance) VALUES ('James','Brimmage','james.brimmage@email.com',10000);    
INSERT INTO users (first_name,last_name,email,curr_balance) VALUES ('William','Palesano','william.palesano@email.com',10000); 
INSERT INTO users (first_name,last_name,email,curr_balance) VALUES ('Marcus','Dickie','marcus.dickie@email.com',10000);       
INSERT INTO users (first_name,last_name,email,curr_balance) VALUES ('Taina','Jones','taina.jones@email.com',10000);
INSERT INTO users (first_name,last_name,email,curr_balance) VALUES ('Thelma','Betts','thelma.betts@email.com',10000);
INSERT INTO users (first_name,last_name,email,curr_balance) VALUES ('Bertha','Montminy','bertha.montminy@email.com',10000);   
INSERT INTO users (first_name,last_name,email,curr_balance) VALUES ('Angeline','Rinkel','angeline.rinkel@email.com',10000);   
INSERT INTO users (first_name,last_name,email,curr_balance) VALUES ('Jeff','Dacosta','jeff.dacosta@email.com',10000);
INSERT INTO users (first_name,last_name,email,curr_balance) VALUES ('Nadine','Sweeney','nadine.sweeney@email.com',10000);     
INSERT INTO users (first_name,last_name,email,curr_balance) VALUES ('Shaun','Neal','shaun.neal@email.com',10000);
INSERT INTO users (first_name,last_name,email,curr_balance) VALUES ('Jason','Armendariz','jason.armendariz@email.com',10000); 
INSERT INTO users (first_name,last_name,email,curr_balance) VALUES ('David','Urbaniak','david.urbaniak@email.com',10000);     
INSERT INTO users (first_name,last_name,email,curr_balance) VALUES ('Leonard','Molineaux','leonard.molineaux@email.com',10000)



CREATE TABLE OrderDetails(
   OrderId BINARY(16) DEFAULT UUID_TO_BIN(UUID()),
   ProductName VARCHAR(100) NOT NULL,
   Price DECIMAL(10, 2) NOT NULL,
);