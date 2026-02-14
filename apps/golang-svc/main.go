package main

import (
	"os"
	"github.com/gin-gonic/gin"
)

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = "3000"
	}

	// Inisialisasi Gin dengan mode release jika bukan development
	// gin.SetMode(gin.ReleaseMode)

	r := gin.Default()

	// Route handler
	r.GET("/", func(c *gin.Context) {
		c.String(200, "Hello from Go app via ArgoCD! 🚀")
	})

	// Health check route (praktik baik untuk Kubernetes/ArgoCD)
	r.GET("/health", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"status": "UP",
		})
	})

	// Jalankan server
	if err := r.Run(":" + port); err != nil {
		panic("Failed to start server: " + err.Error())
	}
}

