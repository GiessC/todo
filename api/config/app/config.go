package app

type Config struct {
	Region            string `env:"TODO__AWS_REGION"`
	TodoTableName     string `env:"TODO__DYNAMODB_TODO_TABLE_NAME"`
	TodoGsi1IndexName string `env:"TODO__DYNAMODB_TODO_GSI1_INDEX_NAME"`
}
