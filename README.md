# Azure AI Resources Demonstration Repository

## Overview

This repository serves as a resource for studying and demonstrating various Azure AI capabilities. It includes infrastructure deployment scripts and application demos.

## Infrastructure Deployment

The repository contains two primary deployments, managed via GitHub Actions:

1. **Machine Learning Studio and Dependencies**: Sets up Azure Machine Learning Studio along with its dependent components.
2. **Cognitive Service Account and Dependencies**: Deploys an Azure Cognitive Service account and its necessary components.

These deployments are automated and can be triggered through specific GitHub Action workflows within the repository.

## Application Demos

The repository includes several application demos highlighting different Azure AI services:

### Computer Vision

Demonstrations include:

- Landmark Detection
- Brand Detection
- Optical Character Recognition (OCR)
- Generating Descriptions for Images
- Creating Thumbnails for Images

### Form Recognizer

A demo showcasing the ingestion and processing of invoice data.

### Language Detection

An application to detect the language from a given text sample.

### Object Detection

Training a custom model to differentiate between Calgary Flames and Vancouver Canucks images.

## Authentication for Running the Apps

Before running the application demos, authentication with Azure is required.

1. Open a terminal or command prompt.
2. Run the command `az login`.
3. Follow the on-screen instructions to complete the authentication process.

For more information on Azure CLI authentication, visit [Azure CLI login documentation](https://docs.microsoft.com/en-us/cli/azure/authenticate-azure-cli).

## Running the Application Demos

Each application demo can be opened and run directly in Visual Studio Code (VSCode) using preconfigured launch profiles.

1. **Open the App in VSCode**: Navigate to the specific app directory and open it in VSCode.
2. **Preconfigured Launch Profiles**: Each app comes with a set of preconfigured launch profiles which are tailored for running the specific demos.
3. **Executing the Demos**: Select the appropriate launch profile from the VSCode debugger and start the demo. This allows you to run and debug the applications seamlessly.
