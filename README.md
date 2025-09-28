# ArgoCD Manifests

This repository contains Kubernetes manifests for deploying applications using ArgoCD following GitOps best practices.

## Directory Structure

```
argocd-manifests/
├── apps/                    # Application configurations
│   ├── golang-app/          # Golang application
│   │   ├── base/            # Base kustomization
│   │   └── overlays/        # Environment-specific configs
│   │       ├── dev/
│   │       └── prod/
│   └── nodejs-app/          # NodeJS application
│       ├── base/
│       └── overlays/
│           ├── dev/
│           └── prod/
├── core/                    # Core infrastructure components
│   ├── argocd/              # ArgoCD installation
│   └── cert-manager/        # Cert-manager installation
├── projects/                # ArgoCD project definitions
└── bootstrap/               # Bootstrap configurations
    └── root-application.yaml # Root application
```

## Getting Started

### Prerequisites

- Kubernetes cluster
- ArgoCD installed in the cluster
- `kubectl` configured to communicate with your cluster

### Bootstrapping ArgoCD

1. Apply the root application to bootstrap ArgoCD:
   ```bash
   kubectl apply -f argocd-manifests/bootstrap/root-application.yaml
   ```

2. The root application will create all other applications defined in the `apps/` directory.
3. Get admin password for Argo CD
```bash
kubectl get secret argocd-initial-admin-secret -n argocd -o jsonpath="{.data.password}"
kubectl get secret argocd-initial-admin-secret -n argocd-learn -o jsonpath="{.data.password}" | ForEach-Object { [System.Text.Encoding]::UTF8.GetString([System.Convert]::FromBase64String($_)) }
```

## Application Structure

Each application follows this structure:

- `base/`: Contains the base Kubernetes manifests that are common across all environments
  - `kustomization.yaml`: Base kustomization file
  - `deployment.yaml`: Deployment manifest
  - `service.yaml`: Service manifest
  - Other Kubernetes resources (ConfigMaps, Secrets, etc.)

- `overlays/<env>/`: Contains environment-specific configurations
  - `kustomization.yaml`: Environment-specific kustomization
  - `ingress.yaml`: Ingress configuration for the environment
  - Other environment-specific patches

## Adding a New Application

1. Create a new directory under `apps/` for your application
2. Set up the base manifests in the `base/` directory
3. Create environment-specific configurations in `overlays/<env>/`
4. Create an Application manifest in the `apps/` directory

## Best Practices

- **Immutable Tags**: Use specific image tags or digests in production
- **Resource Limits**: Always define resource requests and limits
- **Probes**: Configure liveness and readiness probes
- **Labels**: Use consistent labels across all resources
- **Namespaces**: Use separate namespaces for different environments
- **Secrets**: Use external secret management for sensitive data

## CI/CD Integration

The repository includes GitHub Actions workflows for CI/CD. The workflows are triggered on push and pull request events.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
