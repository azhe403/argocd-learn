kubectl wait --for=condition=Ready pod -l app.kubernetes.io/name=argocd-server -n argocd --timeout=300s

kubectl get pods -n argocd -l app.kubernetes.io/name=argocd-server

kubectl port-forward -n argocd svc/argocd-server 12300:443