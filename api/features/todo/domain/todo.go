package domain

import (
	"api/util"
	"fmt"

	"github.com/google/uuid"
)

type Todo struct {
	Pk          string `dynamo:"pk"`
	Sk          string `dynamo:"sk"`
	TodoId      string `dynamo:"todoId"`
	Label       string `dynamo:"label"`
	IsCompleted bool   `dynamo:"isCompleted"`
	UserId      string `dynamo:"userId"`
	CreatedAt   string `dynamo:"createdAt"`
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
	todoItem := &Todo{
		Pk:          getPk("1", isCompleted),
		Sk:          getSk(createdAt, todoId),
		TodoId:      todoId,
		Label:       label,
		IsCompleted: isCompleted,
		CreatedAt:   createdAt,
	}
	for _, option := range options {
		option(todoItem)
	}
	return todoItem
}

func getPk(userId string, isCompleted bool) string {
	return fmt.Sprintf("USER#%s#TODO#COMPLETED#%t", userId, isCompleted)
}

func getSk(createdAt string, todoId string) string {
	return fmt.Sprintf("%s#TODO#%s", createdAt, todoId)
}
