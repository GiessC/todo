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
	"time"

	"github.com/aws/aws-sdk-go-v2/config"
	"github.com/aws/aws-sdk-go-v2/service/dynamodb"
	"github.com/caarlos0/env/v11"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
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
	db := dynamodb.NewFromConfig(dynamoConfig)

	repository := repository.NewTodoRepository(appConfig.TodoTableName, appConfig.TodoGsi1IndexName, db)
	service := service.NewTodoService(repository)

	router := gin.Default()
	router.Use(cors.New(cors.Config{
		AllowAllOrigins: true,
		AllowMethods:    []string{"GET", "POST", "PUT", "PATCH", "DELETE"},
		AllowHeaders:    []string{"Origin"},
		MaxAge:          12 * time.Hour,
	}))

	router.POST(routes.Todo, todo.CreateTodoItemHandler(service))
	router.GET(routes.Todos, todo.GetTodoListHandler(service))
	router.PATCH(routes.TodoItem, todo.UpdateTodoItemHandler(service))
	router.Run(":8080")
}
