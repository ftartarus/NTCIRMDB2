from user_system.utils import *
from django.http import HttpResponseRedirect


def index(request):
    return HttpResponseRedirect('/task/home/')
