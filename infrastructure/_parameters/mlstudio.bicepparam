using '../deploy-mlstudio.bicep'

var namePrefix = 'rink72aistudy'

param resourceGroupName = '${namePrefix}-rgp'
param workspaceName = '${namePrefix}-ml'
param keyVaultName = '${namePrefix}-kv'
param storageAccountName = '${namePrefix}sa'
param applicationInsightsName = '${namePrefix}-ai'
param logAnalyticsWorkspaceName = '${namePrefix}-law'
param tags = {
  group: 'ai-study'
}
