from blog.models import *
from rest_framework import serializers
from rest_auth.models import TokenModel
from django.contrib.auth.models import User

class PostSerializer(serializers.ModelSerializer):
  post_comments = serializers.PrimaryKeyRelatedField(many=True, queryset = Comment.objects.all())
  class Meta:
    model = Post
    fields = ('content', 'date_created', 'author', 'id', 'post_comments')

class CommentSerializer(serializers.ModelSerializer):
  class Meta:
    model = Comment
    fields = ('content', 'date_created', 'author','post','reply_to')

class UserSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = ('username', 'id')

class TokenSerializer(serializers.ModelSerializer):
  user = UserSerializer()
  class Meta:
    model = TokenModel
    fields = ('key', 'user')