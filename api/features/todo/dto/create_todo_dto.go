package dto

import (
	"api/features/todo/domain"
)

type CreateTodoDto struct {
	Label       string `json:"label"`
	IsCompleted bool   `json:"isCompleted"`
}

func NewCreateTodoDto(label string, isCompleted bool) *CreateTodoDto {
	return &CreateTodoDto{
		Label:       label,
		IsCompleted: isCompleted,
	}
}

func (createDto CreateTodoDto) ToTodo() *domain.Todo {
	return domain.NewTodo(createDto.Label, createDto.IsCompleted)
}
