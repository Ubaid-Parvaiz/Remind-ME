from django.urls import path
from .views import CreateReminder,RemoveEmail

urlpatterns = [

path('create/',CreateReminder.as_view(),name="create"),
path('removemail/',RemoveEmail.as_view(),name="remove_email")

]