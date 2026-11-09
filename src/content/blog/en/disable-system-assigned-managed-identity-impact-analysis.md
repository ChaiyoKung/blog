---
title: "Check the Impact Before You Disable a System-assigned Managed Identity"
description: "If you disable it, will the system still work the same? Find out where your enabled System-assigned Managed Identity is used."
createdAt: "Dec 20, 2024"
heroImage: "/blog/disable-system-assigned-managed-identity-impact-analysis/banner.png"
tags:
  - "Managed Identity"
  - "Impact Analysis"
  - "Azure"
  - "Cloud Infrastructure"
  - "Best Practices"
---

Today I had to review some Terraform code. The change was to disable the System-assigned Managed Identity on one Azure App Service.

My question was this. If we disable it, will the system still work the same? Will it still be functional? We enabled the System-assigned Managed Identity before, so we wanted this Azure App Service to have permission to do something with other Azure resources.

What I want to know now is this. Is this enabled System-assigned Managed Identity used anywhere? Is it assigned to anything?

We can check this in the Azure Portal.

![Azure Portal showing assigned identities](/blog/disable-system-assigned-managed-identity-impact-analysis/1.png)

If you see a list, it means the identity is used or assigned somewhere.

![Azure Portal showing no assigned identities](/blog/disable-system-assigned-managed-identity-impact-analysis/2.png)

If you see no list, it means the identity is not used or assigned anywhere.

![Azure Portal role assignment details](/blog/disable-system-assigned-managed-identity-impact-analysis/3.png)

You can also check with the Azure CLI.

```bash
# Retrieve the managed identity principal ID of the specified Azure Web App
principal_id=$(az webapp show --resource-group "rg-demo" --name "app-demo" --query "identity.principalId" -o tsv)

# List all role assignments associated with the managed identity
az role assignment list --all --assignee "$principal_id" --query "[].{Role:roleDefinitionName, Scope:scope}" -o table
```

If you see a list, it means the identity is used or assigned somewhere.

![Azure CLI showing assigned roles](/blog/disable-system-assigned-managed-identity-impact-analysis/4.png)

If you see no list, it means the identity is not used or assigned anywhere.

![Azure CLI showing no assigned roles](/blog/disable-system-assigned-managed-identity-impact-analysis/5.png)

One last thing. Before you disable a System-assigned Managed Identity, don't forget to check where it is used. If you skip this, the system may stop working after you disable it.

Thank you!

P.S. The Azure CLI example checks an Azure App Service. If you want to check another type of Azure resource, use the "show" command for that resource type.
