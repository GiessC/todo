package repository

import (
	"api/features/todo/domain"
	"context"
	"fmt"
	"log"

	"github.com/aws/aws-sdk-go-v2/feature/dynamodb/attributevalue"
	"github.com/aws/aws-sdk-go-v2/service/dynamodb"
)

type TodoRepository struct {
	tableName string
	db        *dynamodb.Client
}

func NewTodoRepository(tableName string, db *dynamodb.Client) *TodoRepository {
	return &TodoRepository{
		tableName: tableName,
		db:        db,
	}
}

func (repository *TodoRepository) Save(todoItem *domain.Todo) (*domain.Todo, error) {
	fmt.Printf("Saving todo item %+v\n", todoItem)

	item, err := attributevalue.MarshalMap(todoItem)
	if err != nil {
		log.Printf("Error marshalling todo item: %v", err)
		return nil, err
	}

	_, err = repository.db.PutItem(context.TODO(), &dynamodb.PutItemInput{
		Item:      item,
		TableName: &repository.tableName,
	})

	if err != nil {
		log.Printf("Error saving todo item: %v", err)
		return nil, err
	}

	return todoItem, nil
}

func (repository *TodoRepository) FindAllByUserAndCompleted(userId string, isCompleted bool) ([]domain.Todo, error) {
	fmt.Printf("Finding all by user id: %s", userId)

	keyConditionExpression := "pk = :pk"
	keyValues := map[string]interface{}{
		":pk": domain.GetPk(userId, isCompleted),
	}
	expressionAttributeValues, err := attributevalue.MarshalMap(keyValues)
	if err != nil {
		log.Printf("Error marshalling key values: %v", err)
		return nil, err
	}

	queryOutput, err := repository.db.Query(context.TODO(), &dynamodb.QueryInput{
		TableName:                 &repository.tableName,
		KeyConditionExpression:    &keyConditionExpression,
		ExpressionAttributeValues: expressionAttributeValues,
	})

	fmt.Printf("Query output: %+v\n", queryOutput)

	if err != nil {
		log.Printf("Error saving todo item: %v", err)
		return nil, err
	}

	todoList := make([]domain.Todo, len(queryOutput.Items))
	for i, item := range queryOutput.Items {
		todo := &domain.Todo{}
		err = attributevalue.UnmarshalMap(item, todo)
		if err != nil {
			log.Printf("Error unmarshalling todo item: %v", err)
			return nil, err
		}
		todoList[i] = *todo
	}
	log.Printf("Todo list: %+v\n", todoList)
	return todoList, nil
}
