#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""NTCIR URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.8/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import include, url
from django.contrib import admin
from assessment import views as assessment_views
from user_system import views
from django.views.generic import RedirectView
admin.autodiscover()

urlpatterns = [
    url(r'^idcon/', 'assessment.views.id_con'),
    url(r'^task/$', assessment_views.assessment, name='assessment'),
    url(r'^admin/', admin.site.urls),
    url(r'^user/', include('user_system.urls')),
    url(r'^$',RedirectView.as_view(url='/user/login')),
    url(r'^task/([0-9]+)/$','assessment.views.jump'),
    url(r'^task/[0-9]+/(\S+)$','assessment.views.show'),
    url(r'^sv/', 'assessment.views.sv'),
    url(r'^st/', 'assessment.views.st'),
    url(r'^download/', 'assessment.views.download_data'),
]