from rest_framework import generics
from ..models import SessionUser
from rest_framework.views import APIView
from ..tasks import process_note
from rest_framework.response import Response

class SessionMixin:
	def get(self,request,*args,**kwargs):
		session = self.request.session
		if not session.get('has_session'):
			session["has_session"] = True
		return super(type(self)).get(self,request,*args,**kwargs)

class CreateReminder(SessionMixin,APIView):
	def post(self,request,*args,**kwargs):
		session_id = self.request.session.session_key
		data = self.request.data
		SessionUser.objects.get_or_create(session_user=session_id,email="ubaidparvez4@gmail.com")
		user  = SessionUser.objects.get(session_user=session_id)
		print(data)
		# If there is an email
		if user.email and not data.get("address"):
			data = data.dict()
			data["address"] = user.email
		elif data.get("savemail"):  
			user.email = data.get("email")  
			emailsaved = True
		else:
			emailsaved = False  


		# process_note.apply_async([data],countdown=2)
		return Response({"message":"you reminder has been set!","emailsaved":emailsaved})
	
	
		# Set the reminder through celery



class RemoveEmail(SessionMixin,APIView):
	def get(self,request,*args,**kwargs):
		session_id = self.request.session.session_key
		print(session_id,"session_id")
		user = SessionUser.objects.get(session_user=session_id)
		user.email = None
		user.save()
		return Response({})
		# except:
		#   return Response({"type":"danger","message":"Couldn't add new email please try again!"},status=500)  
