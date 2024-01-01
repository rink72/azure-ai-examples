using '../deploy.bicep'

var namePrefix = 'rink72aistudy'

param resourceGroupName = '${namePrefix}-rgp'
param workspaceName = '${namePrefix}-ml'
param keyVaultName = '${namePrefix}-kv'
param storageAccountName = '${namePrefix}sa'
param tags = {
  group: 'ai-study'
}
