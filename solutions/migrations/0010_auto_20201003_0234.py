# Generated by Django 3.0.6 on 2020-10-02 21:04

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('solutions', '0009_auto_20201003_0233'),
    ]

    operations = [
        migrations.AlterField(
            model_name='createsurvey',
            name='deadline',
            field=models.DateTimeField(default=datetime.datetime(2020, 10, 3, 2, 34, 12, 123977)),
        ),
    ]
