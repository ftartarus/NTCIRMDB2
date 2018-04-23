#!/usr/bin/env python
# -*- coding: utf-8 -*-
from mongoengine import *
from user_system.models import User
try:
    import simplejson as json
except ImportError:
    import json

# Create your models here.


class ntcir(Document):
    topic_id=StringField()
    topic=StringField()
    title_id=StringField()
    title=StringField()
    url=StringField()


class table(Document):
    table_id=StringField()
    table=StringField()


class usertotask(Document):
    user_id = StringField(primary_key=True)
    title_id = ListField()

class taskevalution(Document):
    key=StringField(primary_key=True)
    user=ReferenceField(User)
    task=ReferenceField(ntcir)
    evalution=IntField()
    time = DateTimeField()

class usr(Document):
    topicid = StringField()
    docid = StringField()
    usrid = StringField()
    val = StringField()
    color = StringField()

class usrlog(Document):
    topicid = StringField()
    docid = StringField()
    usrid = StringField()
    val = StringField()
    time = StringField()

class usrlist(Document):
    usrid=StringField()
    usrl=StringField()

class usrprocess(Document):
    usrid=StringField()
    alltopicnum=StringField()
    topicnum=StringField()

#class Log(Document):
 #   usr = ReferenceField(usr)
  #  table = ReferenceField(table)
   # ntcir = ReferenceField(ntcir)
   # action = StringField()
   # action_object = StringField()         # action on which html('html1' or 'html2')
   # content = StringField()               # Timestamp, Action, Info


#class ExtensionLog(Document):
 #   user = ReferenceField(User)
 #   task = ReferenceField(Task)
 #   task_unit = ReferenceField(TaskUnit)
 #   action = StringField()
 #   site = StringField()
 #   content = StringField()