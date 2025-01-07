package main

import (
	"context"
	"fmt"
	"log"
	"net"

	pb "grpcProject/server/proto" // Local import path

	"google.golang.org/grpc"
	"google.golang.org/grpc/reflection" // Import reflection
)

// server is used to implement sum.SumServiceServer.
type server struct {
	pb.UnimplementedSumServiceServer
}

// Add implements sum.SumServiceServer
func (s *server) Add(ctx context.Context, in *pb.SumRequest) (*pb.SumReply, error) {
	log.Printf("Received: a=%v, b=%v", in.GetA(), in.GetB())
	result := in.GetA() + in.GetB()
	log.Printf("Sending response: %v", result) // Log the response
	return &pb.SumReply{Result: result}, nil
}

func main() {
	lis, err := net.Listen("tcp", ":50051")
	if err != nil {
		log.Fatalf("Failed to listen: %v", err)
	}
	s := grpc.NewServer()
	pb.RegisterSumServiceServer(s, &server{})

	// Register reflection service on gRPC server.
	reflection.Register(s)

	fmt.Println("gRPC server listening on port 50051")
	if err := s.Serve(lis); err != nil {
		log.Fatalf("Failed to serve: %v", err)
	}
}
