# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('assessment', '0001_initial'),
    ]

    operations = [
        migrations.DeleteModel(
            name='content',
        ),
        migrations.DeleteModel(
            name='table',
        ),
        migrations.DeleteModel(
            name='topics',
        ),
    ]
