package mapping

import (
	"api/features/todo/domain"
	"api/features/todo/dto"
)

func ToTodoDto(todo *domain.Todo) *dto.TodoDto {
	return dto.NewTodoDto(todo.Label, todo.IsCompleted, dto.WithTodoId(todo.TodoId), dto.WithCreatedAt(todo.CreatedAt))
}

func CreateTodoDtoToDomain(createDto *dto.CreateTodoDto) *domain.Todo {
	return domain.NewTodo(createDto.Label, createDto.IsCompleted)
}
