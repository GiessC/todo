package util

import "time"

func CurrentIsoString() string {
	return time.Now().UTC().Format(time.RFC3339)
}
