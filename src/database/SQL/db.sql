-- Creacion de la base de datos


-- Creación de la tabla contact_messages
CREATE TABLE `healthup_dev`.`contact_messages` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `surname` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `subject` VARCHAR(45) NOT NULL,
  `message` VARCHAR(500) NOT NULL,
  `type` INT NOT NULL,
  `file` VARCHAR(300) NULL,
  `createdAt` DATETIME NULL,
  `updatedAt` DATETIME NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;