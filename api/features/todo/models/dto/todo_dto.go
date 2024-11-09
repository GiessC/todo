package dto

import (
	"api/util"

	"github.com/google/uuid"
)

type TodoDto struct {
	TodoId      string `json:"todoId"`
	Label       string `json:"label"`
	IsCompleted bool   `json:"isCompleted"`
	CreatedAt   string `json:"createdAt"`
}

type TodoDtoOption func(*TodoDto)

func WithTodoId(todoId string) TodoDtoOption {
	return func(todoDto *TodoDto) {
		todoDto.TodoId = todoId
	}
}

func WithCreatedAt(createdAt string) TodoDtoOption {
	return func(todoDto *TodoDto) {
		todoDto.CreatedAt = createdAt
	}
}

func NewTodoDto(label string, isCompleted bool, options ...TodoDtoOption) *TodoDto {
	todoDto := &TodoDto{
		TodoId:      uuid.New().String(),
		Label:       label,
		IsCompleted: isCompleted,
		CreatedAt:   util.CurrentIsoString(),
	}

	for _, option := range options {
		option(todoDto)
	}

	return todoDto
}
