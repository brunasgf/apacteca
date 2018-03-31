CREATE SCHEMA IF NOT EXISTS `apacteca_db` DEFAULT CHARACTER SET utf8 ;
USE `apacteca_db` ;

-- -----------------------------------------------------
-- Table `apacteca_db`.`genero`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `apacteca_db`.`genero` (
  `id_genero` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id_genero`))
ENGINE = InnoDB;

INSERT INTO genero (nome) VALUES
("Terror"),
("Desenho Animado"),
("Ação");

-- -----------------------------------------------------
-- Table `apacteca_db`.`status`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `apacteca_db`.`status` (
  `id_status` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id_status`))
ENGINE = InnoDB;

INSERT INTO status(nome) VALUES
("Emprestado"), 
("Livre");

-- -----------------------------------------------------
-- Table `apacteca_db`.`tipo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `apacteca_db`.`tipo` (
  `id_tipo` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id_tipo`))
ENGINE = InnoDB;

INSERT INTO tipo(nome) VALUES
("Livro"), 
("Dvds");

-- -----------------------------------------------------
-- Table `apacteca_db`.`obra`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `apacteca_db`.`obra` (
  `id_Obra` INT NOT NULL AUTO_INCREMENT,
  `qtd` INT NOT NULL,
  `titulo` VARCHAR(45) NOT NULL,
  `genero_id` INT NOT NULL,
  `status_id` INT NOT NULL,
  `tipo_id` INT NOT NULL,
  `autor` VARCHAR(45) NOT NULL,
  `descricao` VARCHAR(500) NOT NULL,
  PRIMARY KEY (`id_Obra`),
  INDEX `fk_Obra_genero_idx` (`genero_id` ASC),
  INDEX `fk_obra_status_idx` (`status_id` ASC),
  INDEX `fk_obra_tipo1_idx` (`tipo_id` ASC),
  CONSTRAINT `fk_Obra_genero`
    FOREIGN KEY (`genero_id`)
    REFERENCES `apacteca_db`.`genero` (`id_genero`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_obra_status`
    FOREIGN KEY (`status_id`)
    REFERENCES `apacteca_db`.`status` (`id_status`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_obra_tipo`
    FOREIGN KEY (`tipo_id`)
    REFERENCES `apacteca_db`.`tipo` (`id_tipo`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

INSERT INTO obra (qtd, titulo, genero_id, status_id, tipo_id, autor, descricao) VALUES 
(100, "procurando dory", 2, 1, 1, "Andrew Stanton, Angus MacLane", 	"Um ano após ajudar Marlin a reencontrar seu filho Nemo, Dory tem um insight e lembra de sua amada família. Com saudades, ela decide fazer de tudo para reencontrá-los e acaba esbarrando com amigos do passado e vai parar nas perigosas mãos de humanos.");

-- -----------------------------------------------------
-- Table `apacteca_db`.`pessoa`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `apacteca_db`.`pessoa` (
  `id_pessoa` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(45) NOT NULL,
  `rg` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id_pessoa`))
ENGINE = InnoDB;

INSERT INTO pessoa (nome, rg) VALUES
("Luiz Henrique Silva Jesus", "12345678");

-- -----------------------------------------------------
-- Table `apacteca_db`.`emprestimo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `apacteca_db`.`emprestimo` (
  `id_emprestimo` INT NOT NULL AUTO_INCREMENT,
  `obra_id` INT NOT NULL,
  `pessoa_id` INT NOT NULL,
  `data_emprestimo` VARCHAR(45) NOT NULL,
  `data_devolucao` VARCHAR(45) NULL,
  PRIMARY KEY (`id_emprestimo`),
  INDEX `fk_emprestimo_Obra_idx` (`obra_id` ASC),
  INDEX `fk_emprestimo_pessoa_idx` (`pessoa_id` ASC),
  CONSTRAINT `fk_emprestimo_Obra`
    FOREIGN KEY (`obra_id`)
    REFERENCES `apacteca_db`.`obra` (`id_Obra`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_emprestimo_pessoa`
    FOREIGN KEY (`pessoa_id`)
    REFERENCES `apacteca_db`.`pessoa` (`id_pessoa`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;