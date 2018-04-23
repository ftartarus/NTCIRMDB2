#!/usr/bin/env python
# -*- coding: utf-8 -*-
import time
from user_system.utils import *
from django.shortcuts import render, HttpResponse,render_to_response
from user_system.utils import *
from assessment.models import *
from django.contrib.auth.decorators import login_required
from django.template.loader import render_to_string
import os
import json

class AccessMiddleware(object):
    def process_request(self, request):
        URI = request.get_full_path()
        session = request.session
       # print session.get("username")+" "+URI+" "+time.strftime("%Y-%m-%d %H:%M:%S")
        return None

    def process_response(self, request, response):
        return response