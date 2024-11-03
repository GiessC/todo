package main

import (
	"api/config/app"
	"api/features/todo"
	"api/features/todo/repository"
	"api/features/todo/service"
	"api/util/routes"
	"context"
	"fmt"
	"log"

	"github.com/aws/aws-sdk-go-v2/config"
	"github.com/caarlos0/env/v11"
	"github.com/gin-gonic/gin"
	"github.com/guregu/dynamo/v2"
)

func main() {
	appConfig, err := env.ParseAs[app.Config]()
	fmt.Printf("appConfig: %+v\n", appConfig)
	if err != nil {
		log.Fatalf("unable to load app config, %v", err)
		return
	}

	dynamoConfig, err := config.LoadDefaultConfig(context.TODO(), config.WithRegion(appConfig.Region))
	if err != nil {
		log.Fatalf("unable to load SDK config, %v", err)
		return
	}
	db := dynamo.New(dynamoConfig)

	repository := repository.NewTodoRepository(appConfig.TodoTableName, db)
	service := service.NewTodoService(repository)

	router := gin.Default()
	router.POST(routes.Todo, todo.CreateTodoItemHandler(service))
	router.Run(":8080")
}
