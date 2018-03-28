class Config{
  constructor(){
    this.config = {
      host: "127.0.0.1",
      user: "root",
      password: "",
      database: "apacteca_db"
    }
  }

  getConfig(){
    return this.config
  }
}

module.exports = Config