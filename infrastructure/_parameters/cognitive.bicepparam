using '../deploy-cognitive.bicep'

var namePrefix = 'rink72aistudy'

param resourceGroupName = '${namePrefix}-rgp'
param cognitiveServiceName = '${namePrefix}-cog'

param principals = [
  {
    id: 'b6cded51-31bb-4438-a7c9-4691d458cc0b'
    type: 'User'
  }
  {
    id: 'ddc0a372-d311-4a8b-8369-815fec7eb992'
    type: 'ServicePrincipal'
  }
]

param tags = {
  group: 'ai-study'
}
