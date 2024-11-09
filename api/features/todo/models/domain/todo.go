package domain

import (
	"api/util"
	"fmt"

	"github.com/google/uuid"
)

type Todo struct {
	Pk          string `dynamodbav:"pk"`
	Sk          string `dynamodbav:"sk"`
	Gsi1pk      string `dynamodbav:"gsi1pk"`
	Gsi1sk      string `dynamodbav:"gsi1sk"`
	TodoId      string `dynamodbav:"todoId"`
	Label       string `dynamodbav:"label"`
	IsCompleted bool   `dynamodbav:"isCompleted"`
	UserId      string `dynamodbav:"userId"`
	CreatedAt   string `dynamodbav:"createdAt"`
}

type TodoOption func(*Todo)

func WithId(todoId string) TodoOption {
	return func(todoItem *Todo) {
		todoItem.Gsi1sk = GetGsi1Sk(todoItem.CreatedAt, todoId)
		todoItem.TodoId = todoId
	}
}

func WithCreatedAt(createdAt string) TodoOption {
	return func(todoItem *Todo) {
		todoItem.Gsi1sk = GetGsi1Sk(createdAt, todoItem.TodoId)
		todoItem.CreatedAt = createdAt
	}
}

func NewTodo(userId string, label string, isCompleted bool, options ...TodoOption) *Todo {
	todoId := uuid.NewString()
	createdAt := util.CurrentIsoString()
	todoItem := &Todo{
		Pk:          GetPk(userId, todoId),
		Sk:          GetSk(userId),
		Gsi1pk:      GetGsi1Pk(userId, isCompleted),
		Gsi1sk:      GetGsi1Sk(createdAt, todoId),
		TodoId:      todoId,
		Label:       label,
		IsCompleted: isCompleted,
		UserId:      userId,
		CreatedAt:   createdAt,
	}
	for _, option := range options {
		option(todoItem)
	}
	return todoItem
}

func GetPk(userId string, todoId string) string {
	return fmt.Sprintf("USER#%sTODO#%s", userId, todoId)
}

func GetSk(userId string) string {
	return fmt.Sprintf("USER#%s#TODO", userId)
}

func GetGsi1Pk(userId string, isCompleted bool) string {
	return fmt.Sprintf("USER#%s#TODO#COMPLETED#%t", userId, isCompleted)
}

func GetGsi1Sk(createdAt string, todoId string) string {
	return fmt.Sprintf("TODO#%s#%s", createdAt, todoId)
}