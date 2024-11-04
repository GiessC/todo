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
	CreatedAt   string `dynamo:"createdAt"`
}

type TodoOption func(*Todo)

func WithId(todoId string) TodoOption {
	return func(todoItem *Todo) {
		todoItem.Pk = getPk(todoItem.IsCompleted, todoId)
		todoItem.TodoId = todoId
	}
}

func WithCreatedAt(createdAt string) TodoOption {
	return func(todoItem *Todo) {
		todoItem.Sk = getSk(createdAt)
		todoItem.CreatedAt = createdAt
	}
}

func NewTodo(label string, isCompleted bool, options ...TodoOption) *Todo {
	todoId := uuid.NewString()
	createdAt := util.CurrentIsoString()
	todoItem := &Todo{
		Pk:          getPk(isCompleted, todoId),
		Sk:          getSk(createdAt),
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

func getPk(isCompleted bool, todoId string) string {
	return fmt.Sprintf("TODO#COMPLETED#%t#%s", isCompleted, todoId)
}

func getSk(createdAt string) string {
	return createdAt
}
