CREATE SCHEMA IF NOT EXISTS `apacteca_db` DEFAULT CHARACTER SET utf8 ;
USE `apacteca_db` ;

-- -----------------------------------------------------
-- Table `apacteca_db`.`livro`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `apacteca_db`.`livro` (
  `id_livro` INT NOT NULL AUTO_INCREMENT,
  `autor` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id_livro`))
ENGINE = InnoDB;

insert into livro (autor) values 
("Autor Desconhecido"),
("Álvares de Azevedo"),
("Machado de assis"),
("Clarice Lispector");

-- -----------------------------------------------------
-- Table `apacteca_db`.`dvd`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `apacteca_db`.`dvd` (
  `id_dvd` INT NOT NULL AUTO_INCREMENT,
  `diretor` VARCHAR(45) NOT NULL,
  `descrição` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id_dvd`))
ENGINE = InnoDB;

insert into dvd (diretor, `descrição`) values 
("dory", "filme infantil"),
("jennifer lawrence", "filme muito loco"),
("daniel raddclif", "vcs são trouxas não entenderiam :3"),
("froddo", "filme muito grande e cansativo");

-- -----------------------------------------------------
-- Table `apacteca_db`.`genero`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `apacteca_db`.`genero` (
  `id_genero` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id_genero`))
ENGINE = InnoDB;

insert into genero (nome) values 
("terro"),
("suspense"),
("infantil"),
("romance");

-- -----------------------------------------------------
-- Table `apacteca_db`.`status`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `apacteca_db`.`status` (
  `id_status` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id_status`))
ENGINE = InnoDB;

insert into `status` (nome) values 
("livre"),
("emprestado");

-- -----------------------------------------------------
-- Table `apacteca_db`.`obra`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `apacteca_db`.`obra` (
  `id_obra` INT NOT NULL AUTO_INCREMENT,
  `quantidade` INT NOT NULL,
  `tiulo` VARCHAR(45) NOT NULL,
  `is_livro` INT,
  `is_dvd` INT,
  `genero_id` INT NOT NULL,
  `status_id` INT NOT NULL,
  PRIMARY KEY (`id_obra`),
  INDEX `fk_Obra_genero1_idx` (`genero_id` ASC),
  INDEX `fk_obra_status1_idx` (`status_id` ASC),
  CONSTRAINT `fk_Obra_livro`
    FOREIGN KEY (`is_livro`)
    REFERENCES `apacteca_db`.`livro` (`id_livro`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Obra_dvd1`
    FOREIGN KEY (`is_dvd`)
    REFERENCES `apacteca_db`.`dvd` (`id_dvd`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Obra_genero1`
    FOREIGN KEY (`genero_id`)
    REFERENCES `apacteca_db`.`genero` (`id_genero`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_obra_status1`
    FOREIGN KEY (`status_id`)
    REFERENCES `apacteca_db`.`status` (`id_status`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

insert into obra 
(quantidade, tiulo, is_livro, is_dvd, genero_id, status_id)
values
(10, "procurando dory", null, 1, 3, 1);

-- -----------------------------------------------------
-- Table `apacteca_db`.`pessoa`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `apacteca_db`.`pessoa` (
  `id_pessoa` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(45) NOT NULL,
  `identidade` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id_pessoa`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `apacteca_db`.`emprestimo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `apacteca_db`.`emprestimo` (
  `idemprestimo` INT NOT NULL AUTO_INCREMENT,
  `obra_id` INT NOT NULL,
  `pessoa_id` INT NOT NULL,
  `data_emprestimo` VARCHAR(45) NOT NULL,
  `data_devolucao` VARCHAR(45) NULL,
  PRIMARY KEY (`idemprestimo`),
  INDEX `fk_emprestimo_Obra1_idx` (`obra_id` ASC),
  INDEX `fk_emprestimo_pessoa1_idx` (`pessoa_id` ASC),
  CONSTRAINT `fk_emprestimo_Obra1`
    FOREIGN KEY (`obra_id`)
    REFERENCES `apacteca_db`.`obra` (`id_obra`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_emprestimo_pessoa1`
    FOREIGN KEY (`pessoa_id`)
    REFERENCES `apacteca_db`.`pessoa` (`id_pessoa`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;