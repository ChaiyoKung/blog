---
title: "Deploy to Multiple Environments with Just One GitHub Actions Workflow (Step by Step)"
description: "Deploy to multiple environments with just one GitHub Actions workflow. Cut the duplicate code and manage your Secrets and Variables like a pro."
createdAt: "Jan 4, 2025"
heroImage: "/blog/one-github-actions-deploy-to-multi-environment/banner.jpg"
tags:
  - "Github Actions"
  - "Multi Environment"
  - "CI/CD"
  - "DevOps"
  - "Automation"
---

Normally, you have one GitHub Repo and you want to deploy it to many Environments with GitHub Actions. So you probably create many Workflows, one for each Environment. But if the deploy steps are the same, you end up with Duplicated Code in your Workflows.

The good news is that GitHub can deploy to many Environments with just one Workflow.

Let's try it today.

I have a GitHub Repo (https://github.com/ChaiyoKung/github-actions-environment). It is a simple Web App, just for this Demo.

![GitHub Repo Example](/blog/one-github-actions-deploy-to-multi-environment/1.png)

I also have one Azure App Service for each Environment, for the Demo.

![Azure App Service Environments](/blog/one-github-actions-deploy-to-multi-environment/2.png)

My goal is to deploy this Web App to many Environments with just one GitHub Actions Workflow.

First, we create one GitHub Actions Workflow for the deploy.

Then Commit and Push the Code.

```yaml
name: "Deploy"
run-name: "Deploy to ${{ inputs.environment }}"

on:
  workflow_dispatch:
    inputs:
      environment:
        type: environment
        description: "Environment to deploy to"
        required: true
        default: "dev"

env:
  DOTNET_VERSION: "8"
  DOTNET_OUTPUT_DIR: "GithubActionsEnvironment"

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    environment: ${{ inputs.environment }}
    steps:
      - name: "Checkout"
        uses: actions/checkout@v4

      - name: "Setup .NET Core"
        uses: actions/setup-dotnet@v4
        with:
          dotnet-version: ${{ env.DOTNET_VERSION }}

      - name: "Build and Publish"
        run: |
          dotnet restore
          dotnet build -c "Release"
          dotnet publish -c "Release" -o "${{ env.DOTNET_OUTPUT_DIR }}"

      - name: "Deploy to Azure App Service"
        uses: azure/webapps-deploy@v3
        with:
          app-name: ${{ vars.AZURE_APP_SERVICE_NAME }}
          publish-profile: ${{ secrets.AZURE_APP_SERVICE_PUBLISH_PROFILE }}
          package: "${{ env.DOTNET_OUTPUT_DIR }}"
```

Look at the Workflow. It has an Input with the Type "environment".

![Workflow Input Example](/blog/one-github-actions-deploy-to-multi-environment/3.png)

The "Deploy to Azure App Service" step uses a Variable and a Secret. They change with the Environment, because the Job sets an Environment.

![Environment Variables and Secrets](/blog/one-github-actions-deploy-to-multi-environment/4.png)

Now let's add the Variable and the Secret for each Environment.

Go back to your GitHub Repo, click Settings, choose Environments, and click the New environment button to create an Environment.

![Create New Environment](/blog/one-github-actions-deploy-to-multi-environment/5.png)

Type a name for the Environment, then click the Configure environment button to create it.

![Configure Environment](/blog/one-github-actions-deploy-to-multi-environment/6.png)

When it is ready, Scroll down a little. You will see where to add an Environment Secret and an Environment Variable.

![Environment Secrets and Variables Section](/blog/one-github-actions-deploy-to-multi-environment/7.png)

Let's add the Secret first. Click the Add environment secret button, type the name and the value of the Secret, and click Add secret.

![Add Environment Secret](/blog/one-github-actions-deploy-to-multi-environment/8.png)

Now the Variable. Click the Add environment variable button, type the name and the value of the Variable, and click Add variable.

![Add Environment Variable](/blog/one-github-actions-deploy-to-multi-environment/9.png)

All done. That is one Environment finished.

![Environment Created](/blog/one-github-actions-deploy-to-multi-environment/10.png)

Now do the same for the other 2 Environments. Create the Environment, add the Secret, and add the Variable.

Finished.

![All Environments Created](/blog/one-github-actions-deploy-to-multi-environment/11.png)

Now let's test the deploy.

Click Actions, choose the "Deploy" Workflow, click Run workflow, choose the Environment you want to deploy to, and click Run workflow.

![Run Workflow](/blog/one-github-actions-deploy-to-multi-environment/12.png)

The deploy is done.

![Workflow Completed](/blog/one-github-actions-deploy-to-multi-environment/13.png)

Let's open the Workflow run and check if it deployed to the right place.

It did, because we chose the "dev" Environment.

![Deployed to Dev Environment](/blog/one-github-actions-deploy-to-multi-environment/14.png)

Let's open the website and see if it works.

It works.

![Dev Environment Web App](/blog/one-github-actions-deploy-to-multi-environment/15.png)

Let's deploy one more time. This time I will deploy the "uat" Environment.

It deployed to the right place and it works.

![UAT Environment Web App](/blog/one-github-actions-deploy-to-multi-environment/16.png)

The website for the "prod" Environment looks like this, because we have not deployed it yet.

![Prod Environment Not Deployed](/blog/one-github-actions-deploy-to-multi-environment/17.png)

This is the last one. Let's deploy the "prod" Environment.

Awesome, it works.

![Prod Environment Web App](/blog/one-github-actions-deploy-to-multi-environment/18.png)

That is all you need. You can deploy to many Environments with just one GitHub Actions Workflow.

Just in case you wonder

Q: What happens if we do not add an Environment Variable/Secret?\
A: The GitHub Actions Workflow will use the Repository Variable/Secret instead. If there is no Repository Variable/Secret either, you get an empty value.

![Fallback to Repository Variables and Secrets](/blog/one-github-actions-deploy-to-multi-environment/19.png)

Last thing: this is only one way to do it. In the real world, one method cannot solve every problem. So it is better to choose the method that fits the problem you really want to solve.

Thank you!
