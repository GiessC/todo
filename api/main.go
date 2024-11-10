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

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	"github.com/aws/aws-sdk-go-v2/config"
	"github.com/aws/aws-sdk-go-v2/service/dynamodb"
	ginadapter "github.com/awslabs/aws-lambda-go-api-proxy/gin"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

var ginLambda *ginadapter.GinLambda

func init() {
	log.Printf("Initializing API")

	appConfig := app.GetConfigInstance()

	db := loadDynamoDb()

	repository := repository.NewTodoRepository(appConfig.TodoTableName, appConfig.TodoGsi1IndexName, db)
	service := service.NewTodoService(repository)

	router := gin.Default()
	router.Use(cors.Default())

	createMiddlewareOn(router)
	configureTodoRoutesOn(router, service)

	if appConfig.ShouldRunInLambda {
		ginLambda = ginadapter.New(router)
		return
	}
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

func LambdaHandler(ctx context.Context, req events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	return ginLambda.ProxyWithContext(ctx, req)
}

func main() {
	lambda.Start(LambdaHandler)
}
