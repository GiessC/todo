package service

import (
	"api/features/todo/domain"
	"api/features/todo/dto"
	"api/features/todo/repository"
)

type TodoService struct {
	repository *repository.TodoRepository
}

func NewTodoService(repository *repository.TodoRepository) *TodoService {
	return &TodoService{
		repository: repository,
	}
}

func (service *TodoService) Save(createTodoDto dto.CreateTodoDto) (*domain.Todo, error) {
	return service.repository.Save(createTodoDto.ToTodo())
}
