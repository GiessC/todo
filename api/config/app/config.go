package app

import (
	"fmt"
	"log"

	"github.com/caarlos0/env/v11"
)

type Config struct {
	Region            string `env:"TODO__AWS_REGION"`
	TodoTableName     string `env:"TODO__DYNAMODB_TODO_TABLE_NAME"`
	TodoGsi1IndexName string `env:"TODO__DYNAMODB_TODO_GSI1_INDEX_NAME"`
	JwtSecret         string `env:"TODO__JWT_SECRET"`
	ShouldRunInLambda bool   `env:"TODO__RUN_IN_LAMBDA" envDefault:"false"`
}

var config Config

func GetConfigInstance() Config {
	if (config == Config{}) {
		config, err := tryLoadConfig()
		if err != nil {
			log.Fatalf("unable to load app config, %v", err)
			return Config{}
		}
		return config
	}
	return config
}

func tryLoadConfig() (Config, error) {
	appConfig, err := env.ParseAs[Config]()
	fmt.Printf("appConfig: %+v\n", appConfig)
	if err != nil {
		log.Fatalf("unable to load app config, %v", err)
		return Config{}, err
	}
	return appConfig, nil
}
