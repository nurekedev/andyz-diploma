from django.urls import path, re_path, include
from django.views.generic import TemplateView

from . import views

urlpatterns = [
    path('exists', views.check_username_exists, name='exists'),
    path('home', views.home, name='home')
]

# urlpatterns += [re_path(r'^.*', TemplateView.as_view(template_name='index.html'))]
