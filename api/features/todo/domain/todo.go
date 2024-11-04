package domain

import (
	"api/util"
	"fmt"

	"github.com/google/uuid"
)

type Todo struct {
	Pk          string `dynamodbav:"pk"`
	Sk          string `dynamodbav:"sk"`
	TodoId      string `dynamodbav:"todoId"`
	Label       string `dynamodbav:"label"`
	IsCompleted bool   `dynamodbav:"isCompleted"`
	UserId      string `dynamodbav:"userId"`
	CreatedAt   string `dynamodbav:"createdAt"`
}

type TodoOption func(*Todo)

func WithId(todoId string) TodoOption {
	return func(todoItem *Todo) {
		todoItem.Sk = getSk(todoItem.CreatedAt, todoId)
		todoItem.TodoId = todoId
	}
}

func WithCreatedAt(createdAt string) TodoOption {
	return func(todoItem *Todo) {
		todoItem.Sk = getSk(createdAt, todoItem.TodoId)
		todoItem.CreatedAt = createdAt
	}
}

func NewTodo(label string, isCompleted bool, options ...TodoOption) *Todo {
	todoId := uuid.NewString()
	createdAt := util.CurrentIsoString()
	userId := "1"
	todoItem := &Todo{
		Pk:          GetPk(userId, isCompleted),
		Sk:          getSk(createdAt, todoId),
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

func GetPk(userId string, isCompleted bool) string {
	return fmt.Sprintf("USER#%s#TODO#COMPLETED#%t", userId, isCompleted)
}

func getSk(createdAt string, todoId string) string {
	return fmt.Sprintf("%s#TODO#%s", createdAt, todoId)
}
