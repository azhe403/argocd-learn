FROM golang:1.20-alpine AS build
WORKDIR /src
COPY main.go .
RUN go build -o /bin/golang-svc main.go

FROM alpine:3.18
COPY --from=build /bin/golang-svc /bin/golang-svc
EXPOSE 3000
ENTRYPOINT ["/bin/golang-svc"]
