package main

import (
	"net/http"

	"github.com/bendigiorgio/cms/routes"
	log "github.com/sirupsen/logrus"
)

func main() {
    r := routes.SetupRoutes()
	log.Info("Server is running")
    http.ListenAndServe(":8080", r)
}
