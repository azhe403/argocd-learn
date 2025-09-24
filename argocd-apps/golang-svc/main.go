package main

import (
    "fmt"
    "log"
    "net/http"
    "os"
)

func handler(w http.ResponseWriter, r *http.Request) {
    fmt.Fprintln(w, "Hello from Go app via ArgoCD! 🚀")
}

func main() {
    port := os.Getenv("PORT")
    if port == "" {
        port = "3000"
    }
    http.HandleFunc("/", handler)
    log.Printf("Go app listening on :%s", port)
    if err := http.ListenAndServe(":"+port, nil); err != nil {
        log.Fatalf("server failed: %v", err)
    }
}
