from rest_framework import permissions
from rest_framework.generics import (ListAPIView, RetrieveAPIView, CreateAPIView, DestroyAPIView)
#from rest_framework import viewsets
from .serializers import (PostSerializer, CommentSerializer, UserSerializer)
from blog.models import (Post, Comment)
from django.contrib.auth.models import User

#Posts views

class PostListView(ListAPIView):
  serializer_class = PostSerializer
  queryset = Post.objects.all()
  #permission_classes = (permissions.AllowAny)


class PostRetrieveView(RetrieveAPIView):
  serializer_class = PostSerializer
  queryset = Post.objects.all()
  #permission_classes = (permissions.AllowAny)


class PostCreateView(CreateAPIView):
  serializer_class = PostSerializer
  queryset = Post.objects.all()
  #permission_classes = (permissions.IsAuthenticated)


class PostDeleteView(DestroyAPIView):
  serializer_class = PostSerializer
  queryset = Post.objects.all()
  #permission_classes = (permissions.IsAuthenticated)

"""

class PostViewSet(viewsets.ModelViewSet):
  serializer_class = PostSerializer
  queryset = Post.objects.all()

"""
#Comments views


class CommentListView(ListAPIView):
  queryset = Comment.objects.all()
  serializer_class = CommentSerializer
  #permission_classes = (permissions.AllowAny)


class CommentRetrieveView(RetrieveAPIView):
  serializer_class = CommentSerializer
  queryset = Comment.objects.all()
  #permission_classes = (permissions.AllowAny)


class CommentCreateView(CreateAPIView):
  serializer_class = CommentSerializer
  queryset = Comment.objects.all()
  #permission_classes = (permissions.IsAuthenticated)


class CommentDeleteView(DestroyAPIView):
  serializer_class = CommentSerializer
  queryset = Comment.objects.all()
  #permission_classes = (permissions.IsAuthenticated)
"""

class CommentViewSet(viewsets.ModelViewSet):
  serializer_class = CommentSerializer
  queryset = Comment.objects.all()
"""  
class UserRetrieveView(RetrieveAPIView):
  serializer_class = UserSerializer
  queryset = User.objects.all()

class UserListView(ListAPIView):
  queryset = User.objects.all()
  serializer_class = UserSerializer