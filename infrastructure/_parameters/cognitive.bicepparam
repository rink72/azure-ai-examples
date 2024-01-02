using '../deploy-cognitive.bicep'

var namePrefix = 'rink72aistudy'

param resourceGroupName = '${namePrefix}-rgp'
param cognitiveServiceName = '${namePrefix}-cog'
param tags = {
  group: 'ai-study'
}
