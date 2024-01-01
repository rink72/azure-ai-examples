@description('Storage account name')
param name string

@description('Resource tags')
param tags object = {}

@description('Resource location')
param location string = resourceGroup().location

resource storageAccount 'Microsoft.Storage/storageAccounts@2023-01-01' = {
  name:  name
  tags:  tags
  location: location
  kind: 'StorageV2'
  sku: {
    name: 'Standard_LRS'
  }
  properties: {
    accessTier: 'Hot'
  }
}

output storageAccountId string = storageAccount.id
