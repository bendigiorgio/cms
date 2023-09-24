package utils

import (
	"os"

	"github.com/joho/godotenv"
)

func LoadEnvVariable(key string) string {
	err := godotenv.Load("../.env")

	if err != nil {
		panic("Error loading .env file")
	}

	return os.Getenv(key)
}

func LoadEnvVariables(keys []string) map[string]string {
	err := godotenv.Load("../.env")
	if err != nil {
		panic("Error loading .env file")
	}

	values := make(map[string]string)

	for _, key := range keys {
		values[key] = os.Getenv(key)
	}

	return values
}