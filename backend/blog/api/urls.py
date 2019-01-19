from django.urls import path
#from rest_framework.routers import DefaultRouter
from .views import (PostListView, PostRetrieveView, PostCreateView, PostDeleteView,
                   CommentListView, CommentRetrieveView, CommentCreateView, CommentDeleteView,
                   UserRetrieveView, UserListView)
#from .views import (PostViewSet, CommentViewSet)

"""
router = DefaultRouter()
router.register(r'posts', PostViewSet, base_name='posts' )
router.register(r'comments', CommentViewSet, base_name='comments')
urlpatterns = router.urls
"""


urlpatterns = [
  path('posts/', PostListView.as_view()),
  path('posts/<pk>/', PostRetrieveView.as_view()),
  path('createposts/', PostCreateView.as_view()),
  path('posts/<pk>/delete/', PostDeleteView.as_view()),


  path('comments/', CommentListView.as_view()),
  path('comments/<pk>/', CommentRetrieveView.as_view()),
  path('createcomments/', CommentCreateView.as_view()),
  path('comments/<pk>/delete/', CommentDeleteView.as_view()),

  path('users/', UserListView.as_view()),
  path('users/<pk>/', UserRetrieveView.as_view()),
  
]
