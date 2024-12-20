package repository

import (
	"api/exceptions"
	"api/features/todo/models/domain"
	"context"
	"errors"
	"fmt"
	"log"

	"github.com/aws/aws-sdk-go-v2/feature/dynamodb/attributevalue"
	"github.com/aws/aws-sdk-go-v2/service/dynamodb"
	"github.com/aws/aws-sdk-go-v2/service/dynamodb/types"
)

type TodoRepository struct {
	tableName     string
	gsi1IndexName string
	db            *dynamodb.Client
}

func NewTodoRepository(tableName string, gsi1IndexName string, db *dynamodb.Client) *TodoRepository {
	return &TodoRepository{
		tableName:     tableName,
		gsi1IndexName: gsi1IndexName,
		db:            db,
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
	keyConditionExpression := "gsi1pk = :gsi1pk AND begins_with(gsi1sk, :gsi1sk)"
	expressionAttributeValues := map[string]types.AttributeValue{
		":gsi1pk": &types.AttributeValueMemberS{Value: domain.GetGsi1Pk(userId, isCompleted)},
		":gsi1sk": &types.AttributeValueMemberS{Value: "TODO#"},
	}
	queryInput := &dynamodb.QueryInput{
		TableName:                 &repository.tableName,
		IndexName:                 &repository.gsi1IndexName,
		KeyConditionExpression:    &keyConditionExpression,
		ExpressionAttributeValues: expressionAttributeValues,
	}
	fmt.Printf("Query input: %+v\n", queryInput)

	output, err := repository.db.Query(context.TODO(), queryInput)
	fmt.Printf("Query output: %+v\n", output)
	if err != nil {
		log.Printf("Error querying todo items: %v", err)
		return nil, err
	}

	todoItems := []domain.Todo{}
	err = attributevalue.UnmarshalListOfMaps(output.Items, &todoItems)
	if err != nil {
		log.Printf("Error unmarshalling todo items: %v", err)
		return nil, err
	}

	return todoItems, nil
}

func (repository *TodoRepository) SetTodoCompleted(userId string, todoId string, completed bool) (*domain.Todo, error) {
	updateExpression := "SET isCompleted = :isCompleted"
	conditionExpression := "attribute_exists(pk) AND attribute_exists(sk)"
	output, err := repository.db.UpdateItem(context.TODO(), &dynamodb.UpdateItemInput{
		TableName: &repository.tableName,
		Key: map[string]types.AttributeValue{
			"pk": &types.AttributeValueMemberS{Value: domain.GetPk(userId, todoId)},
			"sk": &types.AttributeValueMemberS{Value: domain.GetSk(userId)},
		},
		ExpressionAttributeValues: map[string]types.AttributeValue{
			":isCompleted": &types.AttributeValueMemberBOOL{Value: completed},
		},
		ConditionExpression: &conditionExpression,
		UpdateExpression:    &updateExpression,
		ReturnValues:        types.ReturnValueAllNew,
	})

	if err != nil {
		var conditionalCheckFailedException *types.ConditionalCheckFailedException
		if errors.As(err, &conditionalCheckFailedException) {
			return nil, exceptions.NewBadRequestException(fmt.Sprintf("Todo item with id %s not found", todoId))
		}
		log.Printf("Error updating todo item: %v", err)
		return nil, err
	}

	todo := &domain.Todo{}
	err = attributevalue.UnmarshalMap(output.Attributes, todo)
	if err != nil {
		log.Printf("Error unmarshalling todo item: %v", err)
		return nil, err
	}
	return todo, nil
}

func (repository *TodoRepository) Delete(userId string, todoId string) (*domain.Todo, error) {
	conditionExpression := "attribute_exists(pk) AND attribute_exists(sk)"
	output, err := repository.db.DeleteItem(context.TODO(), &dynamodb.DeleteItemInput{
		TableName: &repository.tableName,
		Key: map[string]types.AttributeValue{
			"pk": &types.AttributeValueMemberS{Value: domain.GetPk(userId, todoId)},
			"sk": &types.AttributeValueMemberS{Value: domain.GetSk(userId)},
		},
		ConditionExpression: &conditionExpression,
		ReturnValues:        types.ReturnValueAllOld,
	})

	if err != nil {
		var conditionalCheckFailedException *types.ConditionalCheckFailedException
		if errors.As(err, &conditionalCheckFailedException) {
			return nil, exceptions.NewBadRequestException(fmt.Sprintf("Todo item with id %s not found", todoId))
		}
		log.Printf("Error deleting todo item: %v", err)
		return nil, err
	}

	todo := &domain.Todo{}
	err = attributevalue.UnmarshalMap(output.Attributes, todo)
	if err != nil {
		log.Printf("Error unmarshalling todo item: %v", err)
		return nil, err
	}
	return todo, nil
}
