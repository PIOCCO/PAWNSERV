package main

import (
	"github.com/pulumi/pulumi-azure-native/sdk/go/azure/resources"
	"github.com/pulumi/pulumi-azure-native/sdk/go/azure/storage"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		// 1️⃣ Create a Resource Group
		resourceGroup, err := resources.NewResourceGroup(ctx, "PAWNSER", &resources.ResourceGroupArgs{
			Location: pulumi.String("EastUS"),
		})
		if err != nil {
			return err
		}

		// 2️⃣ Create a Storage Account inside the Resource Group
		account, err := storage.NewStorageAccount(ctx, "pawnstorage", &storage.StorageAccountArgs{
			ResourceGroupName: resourceGroup.Name,
			Sku:               &storage.SkuArgs{Name: pulumi.String("Standard_LRS")}, // ✅ Fixed Sku pointer
			Kind:              pulumi.String("StorageV2"),
			Location:          resourceGroup.Location,
		})
		if err != nil {
			return err
		}

		// 3️⃣ Create a Blob Container inside the Storage Account
		_, err = storage.NewBlobContainer(ctx, "userscontainer", &storage.BlobContainerArgs{
			AccountName:       account.Name,
			ResourceGroupName: resourceGroup.Name,
			PublicAccess:      storage.PublicAccessNone.ToPublicAccessPtrOutput(), // ✅ Correct fix
		})
						
		if err != nil {
			return err
		}

		return nil
	})
}
