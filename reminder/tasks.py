from __future__ import absolute_import, unicode_literals
from django.core.mail import send_mail
from celery import shared_task


@shared_task
def process_note(data):
    send_mail(
	    'Your reminder from tasky!',
	    data.get("note"),
	    'ubaidparvez4@gmail.com',
	    [data.get("address")],
	    fail_silently=False,
	)