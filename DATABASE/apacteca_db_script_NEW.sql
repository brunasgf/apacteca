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

INSERT INTO `genero` (`id_genero`, `nome`) VALUES
(1, 'Terror'),
(2, 'Infantil'),
(3, 'Ação'),
(4, 'Autoajuda'),
(5, 'Biográfico'),
(6, 'Científico'),
(7, 'Conto'),
(8, 'Crônicas'),
(9, 'Épico'),
(10, 'Fantasia'),
(11, 'Ficção científica'),
(12, 'Ficção histórica'),
(13, 'Poesia'),
(14, 'Política'),
(15, 'Romance'),
(16, 'Novela'),
(17, 'Outros');
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
  `qtd_total` INT NOT NULL,
  `titulo` VARCHAR(45) NOT NULL,
  `genero_id` INT NOT NULL,
  `status_id` INT NOT NULL,
  `tipo_id` INT NOT NULL,
  `autor` VARCHAR(45) NOT NULL,
  `descricao` VARCHAR(500) NOT NULL,
  `qtd_atual` INT NOT NULL,
  PRIMARY KEY (`id_Obra`),
  INDEX `fk_Obra_genero1_idx` (`genero_id` ASC),
  INDEX `fk_obra_status1_idx` (`status_id` ASC),
  INDEX `fk_obra_tipo1_idx` (`tipo_id` ASC),
  CONSTRAINT `fk_Obra_genero1`
    FOREIGN KEY (`genero_id`)
    REFERENCES `apacteca_db`.`genero` (`id_genero`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_obra_status1`
    FOREIGN KEY (`status_id`)
    REFERENCES `apacteca_db`.`status` (`id_status`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_obra_tipo1`
    FOREIGN KEY (`tipo_id`)
    REFERENCES `apacteca_db`.`tipo` (`id_tipo`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

INSERT INTO `obra` (`id_Obra`, `qtd_total`, `titulo`, `genero_id`, `status_id`, `tipo_id`, `autor`, `descricao`, `qtd_atual`) VALUES
(20, 5, 'O Alquimista', 10, 2, 1, 'Paulo Coelho', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ', 5),
(21, 2, 'Como Vejo o Mundo', 5, 2, 1, 'Albert Einstein', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ', 2),
(22, 1, 'Mr. Mercedes', 1, 2, 1, 'Stephen King', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ', 1),
(23, 4, 'A Lagoa Azul', 15, 2, 2, 'Randal Kleiser', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ', 4);
-- -----------------------------------------------------
-- Table `apacteca_db`.`pessoa`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `apacteca_db`.`pessoa` (
  `id_pessoa` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(45) NOT NULL,
  `rg` VARCHAR(45) NOT NULL,
  `qtd_emprestimos_atvo` INT NOT NULL,
  `data_ultimo_emprestimo` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id_pessoa`),
  UNIQUE INDEX `rg_UNIQUE` (`rg` ASC))
ENGINE = InnoDB;

INSERT INTO pessoa (nome, rg) VALUES
("Luiz Henrique Silva Jesus", "12345678");

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
    REFERENCES `apacteca_db`.`obra` (`id_Obra`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_emprestimo_pessoa1`
    FOREIGN KEY (`pessoa_id`)
    REFERENCES `apacteca_db`.`pessoa` (`id_pessoa`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;