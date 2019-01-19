from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User

class Post(models.Model):
  content = models.TextField()
  date_created = models.DateTimeField(blank=True, default=timezone.now)
  author = models.ForeignKey(User, on_delete=models.CASCADE)

  def __str__(self):
    return self.content

class Comment(models.Model):
  content = models.TextField()
  date_created = models.DateTimeField(blank=True, default=timezone.now)
  author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user')
  post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='post_comments')
  reply_to = models.ForeignKey('self', null=True, blank=True, on_delete=models.CASCADE, related_name='reply_comments')

  def __str__(self):
    return self.content
