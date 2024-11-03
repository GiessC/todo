package repository

import (
	"api/features/todo/domain"
	"context"
	"fmt"
	"log"

	"github.com/guregu/dynamo/v2"
)

type TodoRepository struct {
	tableName string
	db        *dynamo.DB
}

func NewTodoRepository(tableName string, db *dynamo.DB) *TodoRepository {
	return &TodoRepository{
		tableName: tableName,
		db:        db,
	}
}

func (repository *TodoRepository) Save(todoItem *domain.Todo) *domain.Todo {
	fmt.Printf("Saving todo item %+v\n", todoItem)
	table := repository.db.Table(repository.tableName)
	err := table.Put(todoItem).Run(context.TODO())
	if err != nil {
		log.Printf("Error saving todo item: %v", err)
		return nil
	}
	return todoItem
}
