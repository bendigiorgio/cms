package database

import (
	"database/sql"
	"fmt"
	"log"

	"github.com/bendigiorgio/cms/utils"
	_ "github.com/lib/pq"
)
var db *sql.DB

func Connect() {
  var err error
  
  envVars := utils.LoadEnvVariables([]string{"DB_USER", "DB_PASSWORD", "DB_NAME", "DB_HOST"})

  connStr := "user=" + envVars["DB_USER"] + "password=" + envVars["DB_PASSWORD"] + "dbname=" + envVars["DB_NAME"] + "host=" + envVars["DB_HOST"] + "sslmode=verify-full"
  db, err = sql.Open("postgres", connStr)
  if err != nil {
    log.Fatal(err)
  }
  defer db.Close()

  rows, err := db.Query("select version()")
  if err != nil {
    log.Fatal(err)
  }
  defer rows.Close()

  var version string
  for rows.Next() {
    err := rows.Scan(&version)
    if err != nil {
      log.Fatal(err)
    }
  }
  fmt.Printf("version=%s\n", version)
}

func GetDB() *sql.DB {
	return db
}