package main

import (
	"api/auth/middleware"
	"api/config/app"
	"api/features/todo"
	"api/features/todo/repository"
	"api/features/todo/service"
	"api/util/routes"
	"context"
	"log"
	"time"

	"github.com/aws/aws-sdk-go-v2/config"
	"github.com/aws/aws-sdk-go-v2/service/dynamodb"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	appConfig := app.GetConfigInstance()

	db := loadDynamoDb()

	repository := repository.NewTodoRepository(appConfig.TodoTableName, appConfig.TodoGsi1IndexName, db)
	service := service.NewTodoService(repository)

	router := gin.Default()
	router.Use(cors.New(cors.Config{
		AllowAllOrigins: true,
		AllowMethods:    []string{"GET", "POST", "PUT", "PATCH", "DELETE"},
		AllowHeaders:    []string{"Origin"},
		MaxAge:          12 * time.Hour,
	}))

	createMiddlewareOn(router)
	configureTodoRoutesOn(router, service)

	router.Run(":8080")
}

func loadDynamoDb() *dynamodb.Client {
	appConfig := app.GetConfigInstance()

	dynamoConfig, err := config.LoadDefaultConfig(context.TODO(), config.WithRegion(appConfig.Region))
	if err != nil {
		log.Fatalf("unable to load SDK config, %v", err)
		return nil
	}
	db := dynamodb.NewFromConfig(dynamoConfig)

	return db
}

func createMiddlewareOn(router *gin.Engine) {
	appConfig := app.GetConfigInstance()

	authMiddleware := middleware.NewAuthMiddleware(appConfig.JwtSecret)
	router.Use(authMiddleware.Handle())
}

func configureTodoRoutesOn(router *gin.Engine, service *service.TodoService) {
	router.POST(routes.Todo, todo.CreateTodoItemHandler(service))
	router.GET(routes.Todos, todo.GetTodoListHandler(service))
	router.PATCH(routes.TodoItem, todo.UpdateTodoItemHandler(service))
	router.DELETE(routes.TodoItem, todo.DeleteTodoItemHandler(service))
}
