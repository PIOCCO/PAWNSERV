package services

import (
    "context"
    "fmt"
    "os"
    "github.com/Azure/azure-sdk-for-go/sdk/storage/azblob"
)

var containerName = "users"

func UploadUserData(userID string, data []byte) error {
    accountName := os.Getenv("AZURE_STORAGE_ACCOUNT")
    accountKey := os.Getenv("AZURE_STORAGE_KEY")
    credential, err := azblob.NewSharedKeyCredential(accountName, accountKey)
    if err != nil {
        return err
    }

    serviceURL := fmt.Sprintf("https://%s.blob.core.windows.net", accountName)
    client, err := azblob.NewClientWithSharedKeyCredential(serviceURL, credential, nil)
    if err != nil {
        return err
    }

    blobName := fmt.Sprintf("%s.json", userID)
    _, err = client.UploadBuffer(context.TODO(), containerName, blobName, data, nil)
    return err
}
