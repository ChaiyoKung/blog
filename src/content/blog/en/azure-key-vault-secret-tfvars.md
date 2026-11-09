---
title: "Use Azure Key Vault to Manage Terraform Secret Variables"
description: "Make your Terraform secret variables safer with Azure Key Vault. Keep secrets out of your .tfvars file. This post shows how to set it up and use it."
createdAt: "Feb 11, 2025"
heroImage: "/blog/azure-key-vault-secret-tfvars/banner.png"
tags:
  - "Terraform"
  - "Azure Key Vault"
  - "DevOps"
  - "Secrets"
  - "Security"
---

Most of the time, we keep secrets in a `.tfvars` file in Terraform. That is fine. But we can make security even better if we move the secrets into a Vault instead.

In this blog, we will use Azure Key Vault to manage Terraform secret variables.

(Want to know why we use Azure Key Vault? Read this: [Why use Azure Key Vault?](https://learn.microsoft.com/en-us/azure/key-vault/general/overview#why-use-azure-key-vault))

Right now, I have these Azure Resources. I created them with Terraform.

![Azure resources created using Terraform](/blog/azure-key-vault-secret-tfvars/1.png)

If you look at the Terraform code, you will see that the Web App uses a Terraform variable with sensitive data (a secret). The value of this variable lives in the `terraform.tfvars` file.

![Terraform code showing sensitive data in tfvars file](/blog/azure-key-vault-secret-tfvars/2.png)

Here is what I want. I will not keep the secret in `terraform.tfvars` anymore. I will keep it in Azure Key Vault instead.

So let's create an Azure Key Vault first.

I will create it in the Azure Portal. If you want to create it with Terraform, that is fine too. No problem.

![Azure Key Vault creation in Azure Portal](/blog/azure-key-vault-secret-tfvars/3.png)

Fill in the form. Choose any settings you like.

![Azure Key Vault configuration settings](/blog/azure-key-vault-secret-tfvars/4.png)

Mine looks like this. Click Create.

![Azure Key Vault creation progress](/blog/azure-key-vault-secret-tfvars/5.png)

It is created.

![Azure Key Vault successfully created](/blog/azure-key-vault-secret-tfvars/6.png)

To manage secrets in Azure Key Vault, we need the "Key Vault Secrets Officer" role.

So let's add the role.

Open the Azure Key Vault we just created. Then click Add role assignment.

![Adding role assignment in Azure Key Vault](/blog/azure-key-vault-secret-tfvars/7.png)

Search for the role named Key Vault Secrets Officer > click it > click Next

![Selecting Key Vault Secrets Officer role](/blog/azure-key-vault-secret-tfvars/8.png)

Click Select members > search for your own name (or the person you want to give access to) and click it > click Select > click Review + assign

![Selecting members for role assignment](/blog/azure-key-vault-secret-tfvars/9.png)

Read the settings one more time. If everything looks right, click Review + assign.

![Review and assign role settings](/blog/azure-key-vault-secret-tfvars/10.png)

Done. Now I can manage Azure Key Vault secrets.

Let's create a secret.

Go to the Secrets tab > click Generate/Import

![Navigating to Secrets tab in Azure Key Vault](/blog/azure-key-vault-secret-tfvars/11.png)

Enter a name and a value, then click Create.

![Creating a new secret in Azure Key Vault](/blog/azure-key-vault-secret-tfvars/12.png)

Great! The secret is created.

![Secret successfully created in Azure Key Vault](/blog/azure-key-vault-secret-tfvars/13.png)

Next, we will change the Terraform code to read the secret from Azure Key Vault.

To get the secret value, we will use the `azurerm_key_vault_secret` data block (https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/data-sources/key_vault_secret)

![Terraform code using azurerm_key_vault_secret data block](/blog/azure-key-vault-secret-tfvars/14.png)

I ran `terraform plan` to test it. I got No Changes, just what I wanted. Awesome! 🎉

That's all! Now we can use Azure Key Vault to manage Terraform secret variables.

I keep the source code for this blog at https://github.com/ChaiyoKung/azure-key-vault-secret-tfvars. Feel free to take a look. If you give it a star, I will be happy. ⭐

Thank you!
