@description('Keyvault name')
param name string

@description('Resource tags')
param tags object = {}

@description('Resource location')
param location string = resourceGroup().location

resource keyvault 'Microsoft.KeyVault/vaults@2023-07-01' = {
  name:  name
  tags:  tags
  location: location
  properties: {
    tenantId: subscription().tenantId
    sku: {
      name: 'standard'
      family: 'A'
    }
    accessPolicies: []
  }
}

output keyvaultId string = keyvault.id
